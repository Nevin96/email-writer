console.log("Email Writer extension - content script loaded");
function injectButton() {
    
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