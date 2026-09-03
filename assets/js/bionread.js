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
    const safeElements = getElements('[data-bionRead-safe]');
    const renderWord = (word) => {
        if (!word.trim())
            return;
        const len = word.length;
        if (len < 2)
            return `<b>${word}</b>`;
        const mid = Math.ceil(len / 2);
        return `<span><b>${word.slice(0, mid)}</b>${word.slice(mid)}</span>`;
    }

    // define capture and restore environment variable
    const mainContent = getElement('content');
    if (mainContent) {
        document.body.insertAdjacentHTML(
            'beforeend',
            '<div id="snapshot" class="hide" hidden></div>');
    }
    const snapshot = getElement('snapshot');

    // switch conditioning
    if (bionReadSwitch.checked) {
        // capture snapshot
        snapshot.innerHTML = mainContent.innerHTML;

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
                    // swap textNode with assembled fragment
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
        mainContent.innerHTML = snapshot.innerHTML;

        // purge snapshot
        snapshot.innerHTML = '';

        // // restore style
        // rootSty.removeProperty('--fg');
        // rootSty.removeProperty('--bion');

        // // reset color settings
        // setColor();
    }
}