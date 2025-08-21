// make sure the switch unchecked on reload
getElement('useBionRead').innerHTML = `
<input id="bionReadSwitch" accesskey="b" type="checkbox" onclick="bionRead()" aria-keyshortcuts="b" aria-label="${a11y.dataset.i18nBionread}">
<label id="bionReadButton" for="bionReadSwitch">
    <span><strong>Bion</strong>Read</span>
    <kbd class="key" aria-hidden="true">b</kbd>
</label>
`;
bionReadSwitch.checked = false;
// define the function
function bionRead() {
    // define capture and restore environment variable
    const bionReadMainContent = getElement('content');
    const bionReadSnapshot = getElement('bionReadSnapshot');

    if (!bionReadMainContent || !bionReadSnapshot) {
        console.error('Required elements not found');
        return;
    }

    // switch conditioning
    if (bionReadSwitch.checked) {
        // capture snapshot
        bionReadSnapshot.innerHTML = bionReadMainContent.innerHTML;

        // split words into 'anchored' and 'floated' part
        const safeElements = getElements('[data-bionRead-safe]');
        safeElements.forEach(element => {
            const targetElements = element.querySelectorAll('h1, h2, h3, h4, h5, p, a, li, blockquote');
            targetElements.forEach(el => {
                const words = el.innerText.split(' ');
                const processedWords = words.map(word => {
                    const length = word.length;
                    if (length === 1) return `<b class=k>${word}</b>`;
                    const midPoint = Math.ceil(length / 2);
                    return word
                        .split('')
                        .map((char, index) => index < midPoint ? `<b class=k>${char}</b>` : char)
                        .join('');
                });
                el.innerHTML = processedWords.join(' ');
            });
        });

        // make 'floated' text slices less contrast
        htmlSty.setProperty('--fg', lightSwitch.checked ? '#333' : '#ccc');

        // make 'anchored' text slices a bit weighted
        htmlSty.setProperty('--bion', '0.028em');
    } else {
        // restore snapshot
        bionReadMainContent.innerHTML = bionReadSnapshot.innerHTML;

        // purge snapshot
        bionReadSnapshot.innerHTML = '';

        // restore style
        htmlSty.removeProperty('--fg');
        htmlSty.removeProperty('--bion');

        // reset color settings
        setColor();
    }
}