const bodySty = document.body;
const htmlSty = document.documentElement.style;

// Enable accessibility settings when JavaScript is permitted
getElement('a11y').disabled = false;

// Close console
const closeA11yConsole = () => getElement('has-a11y').removeAttribute('open');

// Color scheme and contrast functions
const matchMediaColor = () => {
    lightSwitch.checked = !window.matchMedia('(prefers-color-scheme: dark)').matches;

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
            less: '--off: #000; --fg: #13253d; --mid: #7d8490; --ac: #36c; --bg: #e7e2e2;',
            more: '--off: #000; --fg: #000; --mid: gray;; --ac: #36c; --bg: #fff; --border: 1pt solid var(--fg); --bound: var(--border);',
            default: '--off: #000; --fg: #111; --mid: gray; --ac: #36c; --bg: #f9f9fb;'
        },
        dark: {
            less: '--off: #fff; --fg: #e7e2e2; --mid: #7d8490; --ac: #fa0; --bg: #13253d;',
            more: '--off: #fff; --fg: #fff; --mid: gray; --ac: #fa0; --bg: #000; --border: 1pt solid var(--fg); --bound: var(--border);',
            default: '--off: #fff; --fg: #f9f9fb; --mid: gray; --ac: #fa0; --bg: #111;'
        }
    };
    const scheme = lightSwitch.checked ? 'light' : 'dark';
    const logomarkDark = getElement('logomark--dark');
    if (logomarkDark) {
        const logomark = getElement('logomark');
        logomark.style.display = lightSwitch.checked ? 'inline-block' : 'none';
        logomarkDark.style.display = lightSwitch.checked ? 'none' : 'inline-block';
    }
    const contrast = lessContrast.checked ? 'less' : (moreContrast.checked ? 'more' : 'default');
    bodySty.setAttribute('style', styles[scheme][contrast]);
};

// Flash guard
addEvent(document, 'DOMContentLoaded', () => {
    setTimeout(() => htmlSty.setProperty('--flashGuard', '1s ease-in 0.1s'), 99);
});

// Switch to keyboard-friendly mode
addEvent(document, 'keydown', (element) => {
    if (element.key === 'Tab') {
        document.body.classList.add('keydown');
    }
    if (element.key === 'Escape') {
        document.body.classList.remove('keydown');
    }
});

// Color palette functions
function setColorPalette() {
    document.body.className = colorPalette.value;
};

// OpenDyslexic functions
function useOpenDyslexic() {
    if (OpenDyslexic.checked) {
        htmlSty.setProperty('--rm', 'OpenDyslexic');
        htmlSty.setProperty('--sf', 'OpenDyslexic');
    } else {
        htmlSty.removeProperty('--rm');
        htmlSty.removeProperty('--sf');
    }
    recalcLogotypeWidth();
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
        return false;
    };
};

if (hasLocalStorage()) {
    getElement('a11y-menu').className = '';
    saveButton.disabled = false;
    resetButton.disabled = false;

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