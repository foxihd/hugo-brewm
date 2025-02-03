---
title: "Configure Logo and Accent Color"
description: "How to configure the Logo and Accent Color in Hugo Brewm theme"
date: 2025-01-26
lastmod: 2025-02-03
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
    --ac-light: #36b;
    --ac-dark: #fa1;
}
```

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