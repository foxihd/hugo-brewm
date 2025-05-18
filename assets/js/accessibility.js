const bodySty = document.body;
const htmlSty = document.documentElement.style;
const a11ySty = document.createElement('style');
a11ySty.textContent = `
    #has-a11y{margin-right:auto}#has-a11y-summary{padding:.6ex 1ex;font-weight:700}#has-a11y-summary::before{font-family:'base-ui';font-weight:400;content:'\\e900'}#has-a11y[open] #a11y{--anm:expand 99ms forwards;--tso:bottom}#a11y{display:flex;position:fixed;bottom:calc(1rem + var(--vfoot));flex-direction:column;margin:0;border:var(--border);border-radius:1ex;background:var(--bg);padding:1rem;max-height:calc(100vh - var(--vhead) - var(--vfoot) - 2rem);overflow-y:auto;gap:var(--medskip)}#a11y input[type=checkbox],#a11y input[type=radio],#bionReadSwitch,#defocusAuxElement{position:absolute;top:-100vh}#a11y select,#a11y input[type=range],#setColorScheme label,#setOpenDyslexic,button{cursor:pointer}label.range{display:flex;flex-direction:row-reverse}label.range>input{flex:1;accent-color:var(--ac)}label.range>output{width:4rem;text-align:center;color:var(--ac);font:700 var(--large) var(--sf),sans-serif}#setColorScheme{display:flex;flex-direction:row;align-items:center;margin-bottom:1ex}#lightSwitch + label{display:flex;flex-direction:column;align-items:center;border-radius:.5ex;padding:1ex;width:4rem;font-weight:700;gap:1ex}#lightSwitch:hover + label,#lightSwitch:focus + label,#setContrast>input:hover + label{background:var(--g18s);color:var(--ac)}input + label>#lightSwitchIndicator{--ray-size:calc(var(--size) * -.4);--offset-orthogonal:calc(var(--size) * .65);--offset-diagonal:calc(var(--size) * .45);--tsf:scale(.75);--size:1.414em;display:block;outline:none;border-radius:999px;box-shadow:inset 0 0 0 var(--size),calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),var(--offset-orthogonal) 0 0 var(--ray-size),0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),0 var(--offset-orthogonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);width:var(--size);height:var(--size);color:#ffaa00}input:checked + label>#lightSwitchIndicator{--tsf:scale(1);box-shadow:inset calc(var(--size) * .33) calc(var(--size) * -.25) 0}#setContrast{display:flex;position:relative;flex:1;justify-content:center;margin:0 0 0 1ex;border:none;border-left:var(--bound);padding:2.5em 0 0 1ex}#setContrast legend{position:absolute;top:0;padding:1ex}#setContrast label{-webkit-transition:99ms;-moz-transition:99ms;-o-transition:99ms;transition:99ms;border-radius:1rem;padding:3pt 7pt;font-size:.84em!important}#setContrast>input:checked + label{background:var(--fg);color:var(--bg)}#setContrast>input + label::before{font-family:'base-ui';content:'\\e904\\a0'}#setContrast>input:checked + label::before{content:'\\e903\\a0'}#setColorPalette{align-items:baseline}#setColorPalette>*,#setOpenDyslexic>*{padding:1ex 0}#colorPalette{flex:1;margin-left:.5ex;border:unset;border-radius:1rem;background:var(--bg);padding:.5ex 1.25ex;color:var(--fg);font:inherit!important}#baselineStretchState::after{font-size:.8em;content:'×'}#fontSizeState::after{font-size:.8em;content:'pt'}#setOpenDyslexic>label{display:flex;align-items:center}#OpenDyslexicState{display:flex;margin-left:auto;border-radius:1em;box-shadow:inset 0 1px 5px #0001,0 1px 0 #fff5,0 -1px 0 #0005;background:#80808080;width:2.4em;height:.8em}#OpenDyslexicIndicator{--tst:.5s ease-out;position:relative;align-self:center;border:1pt solid #80808008;border-radius:1em;box-shadow:var(--box-shadow-focus);background:#fff;padding:6pt}#OpenDyslexic:hover + label #OpenDyslexicIndicator,#OpenDyslexic:focus + label #OpenDyslexicIndicator{--anm:grab 3s ease-out 3}#OpenDyslexic:checked:hover + label #OpenDyslexicIndicator,#OpenDyslexic:checked:focus + label #OpenDyslexicIndicator{--anm:unset}#OpenDyslexic:checked + label #OpenDyslexicIndicator{left:1.3em}@keyframes grab{0%,10%,20%,100%{left:0}5%,15%{left:3pt}}@-webkit-keyframes grab{0%,20%,40%,100%{left:0}10%,30%{left:3pt}}#a11y-menu{display:inline-flex;align-items:center;margin:0;padding:0;width:100%;gap:1ex}#a11y-menu>button{display:inline-flex;flex-direction:column;align-items:center;border:unset;padding:1ex}#a11y-menu>.has-aria-label{background:unset;color:var(--fg)}#a11y-menu>.has-aria-label::before{margin:auto;padding:.25rem .5rem}#a11y-menu .has-aria-label:after{font-size:.7em}#resetButton::before{font-family:'base-ui';content:'\\e90f'}#closeButton::before{font-family:'base-ui';content:'\\e913'}#bionReadButton,#saveButton{flex:1;margin-left:auto;cursor:pointer}b.k{vertical-align:baseline;letter-spacing:var(--bion);color:var(--off);font-weight:400!important;-webkit-text-stroke:var(--bion) var(--off);font-synthesis:weight}#useBionRead{display:none;margin:auto;letter-spacing:.1em;font-size:var(--footnotesize)}legend,.has-aria-label-top:before,#setColorPalette>label,input + label>span{font-weight:700}#setContrast>input + label>span{font-weight:400}#bionReadButton>span{font-weight:400;text-transform:uppercase}#noScript,#noLocalStorage{margin:auto;border-top:var(--bound);padding-top:1rem;max-width:20rem}#focusMode{position:fixed;bottom:calc(var(--vfoot) + 1rem);padding:3pt 6pt;display:flex}#focusModeButton{opacity:.7;position:relative}label:hover .t,label:focus .t{position:unset;visibility:visible;margin-left:2rem}input:checked + #focusModeButton{opacity:.5}@media only screen and (max-width:640px){#has-a11y>summary>span{display:none}}
`
document.head.appendChild(a11ySty);

// Enable accessibility settings when JavaScript is permitted
getElement('has-a11y').classList.remove('hide');
getElement('background-footer').classList.remove('hide');

// Render a11y element
const a11y = getElement('a11y');
const i18nColorPalette = a11y.dataset.i18nColorpalette;
const i18nOpenDyslexic = a11y.dataset.i18nOpendyslexic;
const i18nFocusMode = a11y.dataset.i18nFocusmode;
a11y.innerHTML = `
<div id="setColorScheme" role="group" aria-label="${a11y.dataset.i18nColorsettings}">
    <!-- lightSwitch -->
    <input id="lightSwitch" type="checkbox" onclick="setColor()" aria-label="${a11y.dataset.i18nDarkmode}">
        <label for="lightSwitch">
            <div class="has-aria-label off" role="status" aria-label="${a11y.dataset.i18nLight}"></div>
            <div class="has-aria-label on" role="status" aria-label="${a11y.dataset.i18nDark}"></div>
            <div id="lightSwitchIndicator" aria-hidden="true"></div>
        </label>
    <!-- setContrast -->
    <fieldset id="setContrast">
        <legend>${a11y.dataset.i18nContrast}</legend>
        <input id="lessContrast" type="radio" name="setContrast" value="less" onclick="setColor()">
            <label for="lessContrast"><span>${a11y.dataset.i18nLesscontrast}</span></label>
        <input id="defaultContrast" type="radio" name="setContrast" value="default" onclick="setColor()">
            <label for="defaultContrast"><span>${a11y.dataset.i18nDefaultcontrast}</span></label>
        <input id="moreContrast" type="radio" name="setContrast" value="more" onclick="setColor()">
            <label for="moreContrast"><span>${a11y.dataset.i18nMorecontrast}</span></label>
    </fieldset>
</div>
<!-- setColorPalette -->
<div id="setColorPalette" style="display:none;" aria-label="${i18nColorPalette}">
    <label for="colorPalette">${i18nColorPalette}</label>
    <select id="colorPalette" name="colorPalette" oninput="setColorPalette()" aria-label="${i18nColorPalette}">
        <option value="defaultColor">${a11y.dataset.i18nDefaultcolor}</option>
        <option value="deuteranopia">${a11y.dataset.i18nDeuteranopia}</option>
        <option value="protanopia">${a11y.dataset.i18nProtanopia}</option>
        <option value="tritanopia">${a11y.dataset.i18nTritanopia}</option>
        <option value="monochrome">${a11y.dataset.i18nMonochrome}</option>
    </select>
</div>
<!-- setFontSize -->
<div id="setFontSize" class="has-aria-label-top" aria-label="${a11y.dataset.i18nFontsize}">
    <label class="range" for="fontSize" aria-label="${a11y.dataset.i18nFontsize}">
        <input id="fontSize" type="range" min="8" max="12" step="0.5" oninput="setFontSize()">
        <output id="fontSizeState" role="status" aria-live="polite">10</output>
    </label>
</div>
<!-- setBaselineStretch -->
<div id="setBaselineStretch" class="has-aria-label-top" aria-label="${a11y.dataset.i18nBaselinestretch}">
    <label class="range" for="baselineStretch" aria-label="${a11y.dataset.i18nBaselinestretch}">
        <input id="baselineStretch" type="range" min="0.8" max="1.2" step="0.05" oninput="setStretch()">
        <output id="baselineStretchState" role="status" aria-live="polite">1</output>
    </label>
</div>
<!-- setOpenDyslexic -->
<div id="setOpenDyslexic" aria-label="${i18nOpenDyslexic}">
    <input id="OpenDyslexic" type="checkbox" onclick="useOpenDyslexic()" aria-label="${i18nOpenDyslexic}">
    <label class="has-aria-label-top" for="OpenDyslexic" aria-label="${i18nOpenDyslexic}">
        <span id="OpenDyslexicState" aria-hidden="true">
            <span id="OpenDyslexicIndicator"></span>
        </span>
    </label>
</div>
<!-- a11y-menu -->
<menu id="a11y-menu" class="hide" role="toolbar" aria-label="${a11y.dataset.i18nMenucontrols}"></menu>
<!-- noLocalStorage -->
<center id="noLocalStorage" class="hide" role="alert">${a11y.dataset.i18nNolocalstorage}</center>
`;

// Close console
const closeA11yConsole = () => getElement('has-a11y').removeAttribute('open');

// Color scheme and contrast functions
const matchMediaColor = () => {
    lightSwitch.checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (window.matchMedia('(prefers-contrast: more)').matches) {
        moreContrast.checked = true;
    } else if (window.matchMedia('(prefers-contrast: less)').matches) {
        lessContrast.checked = true;
    } else {
        defaultContrast.checked = true;
    }
};

function setColor() {
    const styles = {
        light: {
            default: '--off: #000; --fg: var(--fg-light); --mid: var(--midtone); --ac: var(--ac-light); --bg: var(--bg-light);',
            less: '--off: #000; --fg: var(--fg-light-less); --mid: var(--midtone-less); --ac: var(--ac-light-less); --bg: var(--bg-light-less);',
            more: '--off: #000; --fg: var(--fg-light-more); --mid: var(--midtone-more); --ac: var(--ac-light-more); --bg: var(--bg-light-more); --border: 1pt solid var(--fg); --bound: var(--border);'
        },
        dark: {
            default: '--off: #fff; --fg: var(--fg-dark); --mid: var(--midtone); --ac: var(--ac-dark); --bg: var(--bg-dark);',
            less: '--off: #fff; --fg: var(--fg-dark-less); --mid: var(--midtone-less); --ac: var(--ac-dark-less); --bg: var(--bg-dark-less);',
            more: '--off: #fff; --fg: var(--fg-dark-more); --mid: var(--midtone-more); --ac: var(--ac-dark-more); --bg: var(--bg-dark-more); --border: 1pt solid var(--fg); --bound: var(--border);'
        }
    };
    const scheme = lightSwitch.checked ? 'dark' : 'light';
    const contrast = lessContrast.checked ? 'less' : (moreContrast.checked ? 'more' : 'default');
    bodySty.setAttribute('style', styles[scheme][contrast]);
    const logomarkDark = getElement('logomark--dark');
    if (logomarkDark) {
        const logomark = getElement('logomark');
        logomark.style.display = lightSwitch.checked ? 'none' : 'inline-block';
        logomarkDark.style.display = lightSwitch.checked ? 'inline-block' : 'none';
    }
    const elements = getElements('#background-header, #background-footer');
    elements.forEach(element => {
        moreContrast.checked ? element.classList.add('has-border') : element.classList.remove('has-border');
    });
};

// Flash guard
addEvent(document, 'DOMContentLoaded', () => {
    setTimeout(() => htmlSty.setProperty('--flashGuard', '1s ease-in 0.1s'), 99);
});

// Focus Mode
isPage = getElement('page');
if (isPage) {
    getElement('focusMode').innerHTML = `
    <input id="defocusAuxElement" accesskey="d" type="checkbox" onclick="focusMode()" aria-keyshortcuts="d" aria-label="${i18nFocusMode}">
    <label id="focusModeButton" for="defocusAuxElement" aria-label="${i18nFocusMode}">
        ⦿ <span class="t" role="tooltip">${i18nFocusMode}</span>
    </label>
    `;
    defocusAuxElement.checked = false;
    function focusMode() {
        defocusAuxElement.checked ? bodySty.classList.add('focus') : bodySty.classList.remove('focus');
    };
    // display color palette selections
    hasChroma = getElements('.chroma');
    if (hasChroma) {
        getElement('setColorPalette').setAttribute('style', 'display:flex;');
    }
}

// Switch to keyboard-friendly mode
addEvent(document, 'keydown', (element) => {
    if (element.key === 'Tab') {
        bodySty.classList.add('keydown');
    }
    if (element.key === 'Escape') {
        bodySty.classList.remove('keydown');
    }
});

// Color palette functions
function setColorPalette() {
    bodySty.className = colorPalette.value;
};

// OpenDyslexic functions
function useOpenDyslexic() {
    if (OpenDyslexic.checked) {
        htmlSty.setProperty('--rm', 'OpenDyslexic');
        htmlSty.setProperty('--sf', 'OpenDyslexic');
        htmlSty.setProperty('--tt', 'OpenDyslexicMono');
    } else {
        htmlSty.removeProperty('--rm');
        htmlSty.removeProperty('--sf');
        htmlSty.removeProperty('--tt');
    }
    setTimeout(() => recalcLogotypeWidth(), 1000);
};

// Font size functions
function setFontSize() {
    fontSizeState.value = fontSize.value;
    htmlSty.setProperty('--fontScale', fontSize.value / 10);
};

// Baseline stretch functions
function setStretch() {
    baselineStretchState.value = baselineStretch.value;
    htmlSty.setProperty('--baselineStretch', baselineStretch.value);
};

// Initialize localStorage
function hasLocalStorage() {
    try {
        localStorage.is = 'enable';
        localStorage.removeItem('is');
        return true;
    } catch(e) {
        defaultContrast.checked = true;
        getElement('noLocalStorage').className = '';
        const nDG = getElement('noDOMGiscus');
        if (nDG) {nDG.className = ''};
        return false;
    };
};

if (hasLocalStorage()) {
    getElement('a11y-menu').className = '';
    getElement('a11y-menu').innerHTML = `
        <button id="saveButton" class="reverse" onclick="saveA11y()">${a11y.dataset.i18nSave}</button>
        <button id="resetButton" class="has-aria-label" onclick="resetA11y()" aria-label="${a11y.dataset.i18nReset}"></button>
        <button id="closeButton" class="has-aria-label" onclick="closeA11yConsole()" aria-label="${ a11y.dataset.i18nClose}"></button>
    `;
    // Reset function
    function resetA11y() {
        localStorage.clear();
        matchMediaColor();
        colorPalette.reset;
        fontSize.value = '';
        baselineStretch.value = '';
        OpenDyslexic.checked = false;
        setTimeout(() => window.location.reload(), 100);
    };

    // Save function
    function saveA11y() {
        setTimeout(() => closeA11yConsole(), 618);

        localStorage.scheme = lightSwitch.checked ? 'light' : 'dark';

        if (defaultContrast.checked) localStorage.contrast = 'default';
        if (lessContrast.checked) localStorage.contrast = 'less';
        if (moreContrast.checked) localStorage.contrast = 'more';

        localStorage.colorPalette = colorPalette.value;
        localStorage.font = OpenDyslexic.checked ? 'OpenDyslexic' : '';
        localStorage.fontSize = fontSize.value;
        localStorage.stretchSize = baselineStretch.value;
    };

    // Read settings from localStorage

    if (!localStorage.getItem('scheme') && !localStorage.getItem('contrast')) {
        matchMediaColor();
    } else {
        lightSwitch.checked = localStorage.scheme !== 'dark';

        if (localStorage.contrast === 'more') {
            moreContrast.checked = true;
        } else if (localStorage.contrast === 'less') {
            lessContrast.checked = true;
        } else {
            defaultContrast.checked = true;
        }

        setColor();
    }

    if (localStorage.getItem('colorPalette')) {
        colorPalette.value = localStorage.colorPalette;
        setColorPalette();
    }

    if (localStorage.font === 'OpenDyslexic') {
        OpenDyslexic.setAttribute('checked', 'checked');
        useOpenDyslexic();
    }

    if (localStorage.getItem('fontSize')) {
        fontSize.value = localStorage.fontSize;
        setFontSize();
    }

    if (localStorage.getItem('stretchSize')) {
        baselineStretch.value = localStorage.stretchSize;
        setStretch();
    }

}