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
            return toolbar;
        }
        return null;
    }
}
function createAIbutton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI reply';
    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generate AI reply');
    return button;
}
function injectButton() {
    const existingButton = node.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar){
        console.log("toolbar not found!");
        return;
    }
    console.log("toolbar found! creating AI button");
    const button = createAIbutton();
    button.classList.add('ai-reply-button');
    button.addEventListener('click',async () => {

    });
    toolbar.insertBefore(button, toolbar.firstChild);
}
const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNotes = Array.from(mutation.addedNodes);
        const hasComposedElements = addedNotes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDg,nH Hd, [role="dialog"]') || node.querySelector('.aDg,nH Hd, [role="dialog"]'))
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