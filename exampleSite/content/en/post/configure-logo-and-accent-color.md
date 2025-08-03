---
author : ['Author Name']
title: "Configure Logo and Accent Color"
description: "How to configure the Logo and Accent Color in Hugo Brewm theme"
date: 2025-01-26
lastmod: 2025-02-21
type: post
draft: false
translationKey: logo
coffee: 1
tags: ['configuration', 'logo', 'color', 'accent']
categories: ['configuration']
---

The Hugo Brewm theme allows you to easily configure your site's logo and accent color taylored to your brand. Follow these steps to set up your logo:

## Change Color Accent

To make the color accent align with your brand identity, you can customize the accent color in `custom.css` under `assets/css`.
For example, in `exampleSite/assets/css/custom.css`:

```css
:root {
    /* default contrast */
    --ac-light: #36c;      /* accent color on default contrast */
    --fg-light: #111;      /* foreground color on default contrast */
    --bg-light: #f9f9fb; /* background color on default contrast */
    --midtone: gray;       /* midtone on default contrast */
    --fg-dark: #f9f9fb;  /* foreground color on dark mode, default contrast */
    --bg-dark: #111;       /* background color on dark mode, default contrast */
    --ac-dark: #fa0;       /* accent color on dark mode, default contrast */

    /* less contrast */
    --ac-light-less: var(--ac-light);
    --fg-light-less: #13253d;
    --bg-light-less: #e7e2e2;
    --midtone-less: #7d8490;
    --fg-dark-less: #e7e2e2;
    --bg-dark-less: #13253d;
    --ac-dark-less: var(--ac-dark);

    /* more contrast */
    --ac-light-more: var(--ac-light);
    --fg-light-more: #000;
    --bg-light-more: #fff;
    --midtone-more: gray;
    --fg-dark-more: #fff;
    --bg-dark-more: #000;
    --ac-dark-more: var(--ac-dark);
}
```

This file will take the place of custom.css in the theme. To avoid missing the color variable during the build, please copy every variable and do not remove any.

## Adding Logo Image / Logomark Icon

> Prepare your logo image
>
> - Create or prepare your logo image file (recommended formats: PNG or SVG)
> - For best results, use an image with a transparent background
> - Recommended dimensions: height of 50px to 70px
> - You can also add dark mode version of your logo

Configure the logo in your site configuration:

```toml
[params]
    logoMark = 'https://example.com/logoMark.svg'
    logoMarkDark = 'https://example.com/logoMarkDark.svg' #optional
```

## Using Logo Type Preset

If you prefer not to use an image logo, you can enable the built-in text-based logo by adding this setting:

```toml
[params]
    logoType = true
```

After making these changes, rebuild your site to see the updated logo. The logo will automatically appear in the site's header and will be responsive across different device sizes.