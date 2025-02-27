---
author : ['Author Name']
title: "Configure Main Footer"
description: "How to configure the main footer in Hugo Brewm theme"
date: 2025-01-26
type: post
draft: false
translationKey: mainfooter
coffee: 1
tags: ['configuration', 'footer']
categories: ['configuration']
---

The main footer in Hugo Brewm theme can be customized through several configuration options. Here's how to set up different components of the footer.

## Configure Footer Title and Content

To set up the main footer content, create a markdown file in your content directory with the following front matter:

```yaml
---
type: footer
title: "Your Main Footer Title"
weight: 1
params:
    headless: true # prevent page body to be render and redirect to 404.html
    target: "https://example.com" # override the redirect target
---
```

You can then add your footer content below the front matter using markdown.
Multiple footer sections can be created using different markdown files.

## Configure Footer Menu Items

Footer menu items can be configured in your site's config.toml file. Here's how to add menu items:

```toml
[[menu.footer]]
    identifier = "github"       # Unique identifier for the menu item
    name = "GitHub"             # Display name/tooltip
    url = "https://github.com/" # Link URL
    pre = "github"              # Icon
```

## Enable Coffee Stats

If you want to display coffee statistics in your footer, enable it in your config.toml:

```toml
[params]
    coffeeStat = true    # Set to false to disable
```

Every `coffee` parameter in your content frontmatter will be counted and displayed in the footer.
