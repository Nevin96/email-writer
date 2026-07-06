console.log("Email Writer extension - content script loaded");
function findComposeToolbar() {
    
}
function createAIbutton() {
    
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
        
    })
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