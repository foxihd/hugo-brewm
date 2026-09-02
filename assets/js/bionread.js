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
        const length = word.length;
        const midPoint = Math.ceil(length / 2);
        return length < 2 
            ? `<b class=k>${word}</b>`
            : `<span><b class=k>${word.slice(0, midPoint)}</b>${word.slice(midPoint)}</span>`;
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
                const words = el.textContent.split(' ');
                el.innerHTML = words.map(word => renderWord(word)).join(' ');
            });
        });

        // make 'floated' text slices less contrast
        rootSty.setProperty('--fg', lightSwitch.checked ? '#333' : '#ccc');

        // make 'anchored' text slices a bit weighted
        rootSty.setProperty('--bion', '0.028em');
    } else {
        // restore snapshot
        bionReadMainContent.innerHTML = bionReadSnapshot.innerHTML;

        // purge snapshot
        bionReadSnapshot.innerHTML = '';

        // restore style
        rootSty.removeProperty('--fg');
        rootSty.removeProperty('--bion');

        // reset color settings
        setColor();
    }
}