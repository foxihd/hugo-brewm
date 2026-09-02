// make sure the switch unchecked on reload
getElement('useBionRead').innerHTML = `
<input id="bionReadSwitch" accesskey="b" type="checkbox" onclick="bionRead()" aria-label="${a11y.dataset.i18nBionread}">
<label id="bionReadButton" for="bionReadSwitch">
    <span><strong>Bion</strong>Read</span>
    <kbd class="key" aria-hidden="true" data-key="b"></kbd>
</label>
`;
bionReadSwitch.checked = false;
// define the function
function bionRead() {
    // define capture and restore environment variable
    const bionReadMainContent = getElement('content');
    const bionReadSnapshot = getElement('bionReadSnapshot');
    const safeElements = getElements('[data-bionRead-safe]');
    const renderWord = (word) => {
        if (!word.trim()) return;
        const length = word.length;
        const midPoint = Math.ceil(length / 2);
        return length < 2 
            ? `<b>${word}</b>`
            : `<span><b>${word.slice(0, midPoint)}</b>${word.slice(midPoint)}</span>`;
    }

    if (!bionReadMainContent || !bionReadSnapshot) {
        console.error('Required elements not found');
        return;
    }

    // switch conditioning
    if (bionReadSwitch.checked) {
        // capture snapshot
        bionReadSnapshot.innerHTML = bionReadMainContent.innerHTML;

        // split words into 'anchored' and 'floated' part
        safeElements.forEach(element => {
            const targetElements = element.querySelectorAll('h1, h2, h3, h4, h5, p, a, li, blockquote');
            targetElements.forEach(el => {
                // treeWalker API
                const textWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                let indexNode;
                const textNodes = [];
                // add to textNodes array
                while (indexNode = textWalker.nextNode()) {
                    textNodes.push(indexNode);
                }
                // process textNodes
                textNodes.forEach(textNode => {
                    // temp container
                    const fragment = document.createDocumentFragment();
                    const scratch = document.createElement('span');
                    // process Words
                    const words = textNode.textContent.split(' ');
                    scratch.innerHTML = words.map(renderWord).join(' ');
                    // swap textNode with rendered fragment
                    while (scratch.firstChild) {
                        fragment.appendChild(scratch.firstChild);
                    }
                    textNode.parentNode.replaceChild(fragment, textNode);
                });
            });
        });

        // // make 'floated' text slices less contrast
        // rootSty.setProperty('--fg', lightSwitch.checked ? '#333' : '#ccc');

        // // make 'anchored' text slices a bit weighted
        // rootSty.setProperty('--bion', '0.028em');
    } else {
        // restore snapshot
        bionReadMainContent.innerHTML = bionReadSnapshot.innerHTML;

        // purge snapshot
        bionReadSnapshot.innerHTML = '';

        // // restore style
        // rootSty.removeProperty('--fg');
        // rootSty.removeProperty('--bion');

        // reset color settings
        // setColor();
    }
}