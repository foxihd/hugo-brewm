const bodySty = document.body;
const htmlSty = document.documentElement.style;
const a11ySty = document.createElement('style');
a11ySty.textContent = `
 #has-a11y{margin-right:auto}#has-a11y-summary{padding:.6ex 1ex;font-weight:700}#has-a11y-summary::before{font-family:'base-ui';font-weight:400;content:'\\e900'}#has-a11y[open] #a11y{--anm:expand 99ms forwards;--tso:bottom}#a11y{display:flex;position:fixed;bottom:calc(1rem + var(--vfoot));flex-direction:column;margin:0;border:var(--border);border-radius:1ex;background:var(--bg);padding:1rem;max-height:calc(100vh - var(--vhead) - var(--vfoot) - 2rem);overflow-y:auto;gap:var(--medskip)}#optimizeSR{order:6}#setFontSize{order:3}#setBaselineStretch{display:none;order:4}main#page + footer #setBaselineStretch,main#page + footer #useBionRead{display:block}#setOpenDyslexic{order:5}#a11y input[type=checkbox],#a11y input[type=radio],#bionReadSwitch,#defocusAuxElement{position:absolute;top:-100vh}#a11y select,#a11y input[type=range],#setColorScheme label,#setOpenDyslexic,button{cursor:pointer}label.range{display:flex;flex-direction:row-reverse}label.range>input{flex:1;accent-color:var(--ac)}label.range>output{width:4rem;text-align:center;color:var(--ac);font:700 var(--large) var(--sf),sans-serif}#setColorScheme{display:flex;flex-direction:row;align-items:center;order:1;margin-bottom:1ex}#lightSwitch + label{display:flex;flex-direction:column-reverse;align-items:center;border-radius:.5ex;padding:1ex;width:4rem;gap:1ex}#lightSwitch + label:hover,#lightSwitch:focus + label,#setContrast input:hover + label{background:var(--g18s);color:var(--ac)}#lightSwitch + label::before{--ray-size:calc(var(--size) * -.4);--offset-orthogonal:calc(var(--size) * .65);--offset-diagonal:calc(var(--size) * .45);--tsf:scale(.75);--size:1.414em;display:block;outline:none;border-radius:999px;box-shadow:inset 0 0 0 var(--size),calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),var(--offset-orthogonal) 0 0 var(--ray-size),0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),0 var(--offset-orthogonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);width:var(--size);height:var(--size);color:#ffaa00;content:''}#lightSwitch:checked + label::before{--tsf:scale(1);box-shadow:inset calc(var(--size) * .33) calc(var(--size) * -.25) 0}#lightSwitch + label::after{color:var(--fg);font-size:inherit;font-weight:700}#setContrast{display:flex;position:relative;justify-content:center;margin:0 0 0 1ex;border:none;border-left:var(--bound);padding:2em 0 0 1ex}#setContrast legend{position:absolute;top:.2em}#setContrast>div{display:flex;padding:2pt;gap:2pt}#setContrast label{--tst:99ms;border-radius:1rem;padding:1pt 5pt;font-size:.84em!important}#setContrast input:checked + label{background:var(--fg);color:var(--bg);box-shadow:var(--box-shadow)}#setContrast input + label::before{font-family:'base-ui';content:'\\e904\\a0'}#setContrast input:checked + label::before{content:'\\e903\\a0'}#setColorPalette{align-items:baseline;order:2}#setColorPalette>*,#setOpenDyslexic>*{padding:1ex 0}#colorPalette{flex:1;margin-left:.5ex;border:unset;border-radius:1rem;background:var(--bg);padding:.5ex 1.25ex;color:var(--fg);font:inherit!important}#baselineStretchState::after{font-size:.8em;content:'×'}#fontSizeState::after{font-size:.8em;content:'pt'}input.toggle + label{display:flex;position:relative;padding-right:3.6rem;align-items:center;font-weight:bold}input.toggle:focus + label::after{background:var(--ac)}input.toggle + label::before,input.toggle + label::after{position:absolute;right:0;border-radius:2rem;box-shadow:var(--box-shadow-inset);background:#80808080;width:2.4rem;height:.8rem;content:""}input.toggle + label::after{--tst:.5s ease-out;right:1.2rem;border:1pt solid #80808008;box-shadow:var(--box-shadow);background:#fff;width:1.2rem;height:1.2rem}input.toggle:checked + label::after{right:0}input.toggle:checked + label::before{opacity:.8;background:var(--ac)}#a11y-menu{display:inline-flex;align-items:center;order:7;margin:0;padding:0;width:100%;gap:1ex}#a11y-menu>button{display:inline-flex;flex-direction:column;align-items:center;border:unset}#a11y-menu>.has-aria-label{background:unset;color:var(--fg)}#a11y-menu>.has-aria-label::before{margin:auto;padding:.25rem .5rem}#a11y-menu .has-aria-label:after{font-size:.7em}#resetButton::before{font-family:'base-ui';content:'\\e90f'}#closeButton::before{font-family:'base-ui';content:'\\e913'}#bionReadButton,#saveButton{flex:1;margin-left:auto;cursor:pointer}b.k{vertical-align:baseline;letter-spacing:var(--bion);color:var(--off);font-weight:400!important;-webkit-text-stroke:var(--bion) var(--off);font-synthesis:weight}#useBionRead{display:none;margin:auto;letter-spacing:.1em;font-size:var(--footnotesize)}legend,.has-aria-label-top:before,#setColorPalette>label,input + label>span{font-weight:700}#setContrast input + label>span{font-weight:400}#bionReadButton>span{font-weight:400;text-transform:uppercase}#noLocalStorage{order:7;margin:auto;border-top:var(--bound);padding-top:1rem;max-width:20rem}#focusMode{position:fixed;bottom:calc(var(--vfoot) + 1rem);padding:3pt 6pt;display:flex}#focusModeButton{opacity:.7;position:relative}label:hover .t,label:focus .t{position:unset;visibility:visible;margin-left:2rem}input:checked + #focusModeButton{opacity:.5}#setContrast input:checked:focus + label,#OpenDyslexic:checked + label #OpenDyslexicState,#saveButton:hover,#saveButton:focus,#bionReadSwitch:hover + label,#bionReadSwitch:focus + label,#bionReadSwitch:active + label,#bionReadSwitch:checked + label{background:var(--ac)}#has-a11y[open]>#has-a11y-summary,#lightSwitch:hover + label span::after,#lightSwitch:focus + label span::after,#a11y-menu>.has-aria-label:focus,#a11y-menu>.has-aria-label:hover{color:var(--ac)}body.sr-user{--rm:monospace;--sf:monospace;--tt:monospace}menu.srm--a a::before{display:none}menu.srm--a .srt,.share.srm--a .srt{padding:1ex;margin:2pt}.srm--a + #back::before{content:unset}menu.srm--a + #back{padding:9pt}#has-search>summary.srm--a,#has-more-menu>summary.srm--a{width:unset;padding:0 5pt}#to-top .t,#has-search>summary.srm--a::before{display:none}menu.srm--a a,#to-top.srm--a{width:unset;font-size:1rem;line-height:1}img[data-src],.srs[data-style]{border:var(--bound)}@media only screen and (max-width:640px){#has-a11y>summary>span{display:none}}
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
<!-- optimizeSR -->
<div id="optimizeSR">
    <input id="useSR" class="toggle" type="checkbox" onclick="useSreenReader()">
    <label for="useSR" aria-description="${a11y.dataset.i18nOptimizesrDesc}">${a11y.dataset.i18nOptimizesr}</label>
</div>
<!-- setColorScheme -->
<div id="setColorScheme" class="sri" role="group" aria-label="${a11y.dataset.i18nColorsettings}">
    <!-- lightSwitch -->
    <input id="lightSwitch" type="checkbox" onclick="setColor()">
    <label id="lightSwitchIndicator" class="has-desc" for="lightSwitch" aria-label="${a11y.dataset.i18nDarkmode}" aria-description="${a11y.dataset.i18nLight}">
    </label>
    <!-- setContrast -->
    <fieldset id="setContrast">
        <legend>${a11y.dataset.i18nContrast}</legend>
        <div>
            <input id="lessContrast" type="radio" name="setContrast" value="less" onclick="setColor()">
                <label for="lessContrast"><span>${a11y.dataset.i18nLesscontrast}</span></label>
            <input id="defaultContrast" type="radio" name="setContrast" value="default" onclick="setColor()">
                <label for="defaultContrast"><span>${a11y.dataset.i18nDefaultcontrast}</span></label>
            <input id="moreContrast" type="radio" name="setContrast" value="more" onclick="setColor()">
                <label for="moreContrast"><span>${a11y.dataset.i18nMorecontrast}</span></label>
        </div>
    </fieldset>
</div>
<!-- setColorPalette -->
<div id="setColorPalette" class="sri" style="display:none;">
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
<div id="setFontSize" class="has-aria-label-top sri" aria-label="${a11y.dataset.i18nFontsize}">
    <label class="range" for="fontSize" aria-label="${a11y.dataset.i18nFontsize}">
        <input id="fontSize" type="range" min="8" max="12" step="0.5" oninput="setFontSize()">
        <output id="fontSizeState" for="fontSize" role="status" aria-live="polite">10</output>
    </label>
</div>
<!-- setBaselineStretch -->
<div id="setBaselineStretch" class="has-aria-label-top sri" aria-label="${a11y.dataset.i18nBaselinestretch}">
    <label class="range" for="baselineStretch" aria-label="${a11y.dataset.i18nBaselinestretch}">
        <input id="baselineStretch" type="range" min="0.8" max="1.2" step="0.05" oninput="setStretch()">
        <output id="baselineStretchState" for="baselineStretch" role="status" aria-live="polite">1</output>
    </label>
</div>
<!-- setOpenDyslexic -->
<div id="setOpenDyslexic" class="sri">
    <input id="OpenDyslexic" class="toggle" type="checkbox" onclick="useOpenDyslexic()">
    <label for="OpenDyslexic" aria-label="${i18nOpenDyslexic}">
        ${i18nOpenDyslexic}
    </label>
</div>
<!-- a11y-menu -->
<menu id="a11y-menu" class="hide" role="toolbar" aria-label="${a11y.dataset.i18nMenucontrols}"></menu>
<!-- noLocalStorage -->
<center id="noLocalStorage" class="hide" role="alert">${a11y.dataset.i18nNolocalstorage}</center>
`;

// Close console
const closeA11yConsole = () => getElement('has-a11y').removeAttribute('open');

// Optimize content for screen reader
function useSreenReader() {
    if (useSR.checked) {
        // do not load external fonts
        bodySty.classList.add('sr-user');
        // alternate tooltip
        getElements('.srt').forEach(element => {
            element.classList.remove('t');
        });
        // eliminate icon/presentation
        getElements('.sri').forEach(element => {
            element.classList.add('hide');
        });
        // add modifier class key
        getElements('.srm').forEach(element => {
            element.classList.add('srm--a');
        });
        // alternate tabindex
        getElements('.sr0').forEach(element => {
            element.setAttribute('data-tabindex', element.tabIndex);
            element.removeAttribute('tabindex');
        });
        // do not load images
        getElements('img').forEach(element => {
            element.setAttribute('data-src', element.src);
            element.removeAttribute('src');
        });
        // do not load images embedded in style
        getElements('.srs').forEach(element => {
            element.setAttribute('data-style', element.style);
            element.removeAttribute('style');
        });
    } else {
        bodySty.classList.remove('sr-user');
        getElements('.srt').forEach(element => {
            element.classList.add('t');
        });
        getElements('.sri').forEach(element => {
            element.classList.remove('hide');
        });
        getElements('.srm').forEach(element => {
            element.classList.remove('srm--a');
        });
        getElements('.sr0').forEach(element => {
            element.tabIndex = element.dataset.tabIndex;
            element.removeAttribute('data-tabindex');
        });
        getElements('img').forEach(element => {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        });
        getElements('.srs').forEach(element => {
            element.style = element.dataset.style;
            element.removeAttribute('data-style');
        });
    }
};

// Color scheme and contrast functions
const matchMediaColor = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        lightSwitchIndicator.setAttribute('aria-description', a11y.dataset.i18nDark);
        lightSwitch.checked = true;
    }
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
    lightSwitchIndicator.setAttribute('aria-description', (lightSwitch.checked ? a11y.dataset.i18nDark : a11y.dataset.i18nLight));
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
        getElement('noDOMGiscus')?.removeAttribute('class');
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
        useSR.checked = false;
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
        localStorage.useSR = useSR.checked ? 'true' : 'false';
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

    if (localStorage.useSR === 'true') {
        useSR.setAttribute('checked', 'checked');
        useSreenReader();
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