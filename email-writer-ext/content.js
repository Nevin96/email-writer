console.log("Email Writer extension - content script loaded");
function findComposeToolbar() {
    const selectors = [
        '.aDh',
        '.btC',
        '[role="toolbar"]',
        '.gu.Up'
    ];
    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            console.log("found: ",selector);
            return toolbar;
        }
    }
    return null;
}
function createAIbutton() {
    const button = document.createElement('button');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.type = 'button';
    button.innerText= 'AI reply';

    button.style.marginRight = "12px";
    button.style.height = "36px";
    button.style.padding = "0 18px";

    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generate AI reply');
    return button;
}
function getEmailContent() {
    const selectors = [
        'a3s.aiL',
        'ii.gt',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
    }
    return '';
}
function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar){
        console.log("toolbar not found!");
        return;
    }
    console.log("toolbar found! creating AI button");
    console.log(toolbar);
    const button = createAIbutton();
    button.classList.add('ai-reply-button');
    button.addEventListener('click',async () => {
        try {
            button.innerHTML = 'Generating Email...';
            button.disabled = true;
            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    content : emailContent,
                    tone : 'professional'
                })
            });
            if(!response){
                throw new Error('API request Failed!');
            }
            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText',false,generatedReply);
            }else{
                console.error("compose box not found!!!");
            }
        } catch (error) {
            console.error(error);
            alert('failed to generate reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });
    toolbar.insertBefore(button, toolbar.firstChild);
}
const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNotes = Array.from(mutation.addedNodes);
        const hasComposedElements = addedNotes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDg,.nH.Hd, [role="dialog"]') || node.querySelector('.aDg,nH Hd, [role="dialog"]'))
        );
        if (hasComposedElements){
        console.log("Compose window Detected!");
        setTimeout(injectButton,500);
    }
    }
});
observer.observe(document.body,{
    childList:true,
    subtree: true
});