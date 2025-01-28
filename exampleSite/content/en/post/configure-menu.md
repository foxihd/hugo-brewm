---
title: "Configure Menu"
description: "How to configure the menu in Hugo Brewm theme"
date: 2025-01-26
type: post
draft: false
translationKey: menus
coffee: 1
tags: ['configuration', 'menu']
categories: ['configuration']
---

Learn how to configure menus in the Hugo Brewm theme using either `config.toml` or `menus[.lang].toml` files.

## Menu Parameters

- `identifier`: Unique identifier for each menu item
- `name`: Text shown in the menu
- `url`: External link destination
- `pageRef`: Link to internal pages
- `weight`: Menu item ordering (smaller numbers first)
- `pre`: Icon placement
- `post`: Description for the link
- `parent`: Parent menu item reference

## Adding Icons

Add icons to your menu items with the `pre` parameter. Currently, only preset font icons are supported:

```toml
[[menu.main]]
    identifier = "github"
    name = "GitHub"
    url = "https://github.com/"
    pre = "github"
```

## Creating Nested Menus

Create dropdown menus by using the `parent` parameter:

```toml
[[menu.main]]
    identifier = "about"
    name = "About"
    pageRef = "/about"

    [[menu.main]]
        identifier = "about-author"
        name = "Author"
        pageRef = "/about/author"
        parent = "about"
```

## Language Support

There are four ways to add multi-language support to your menus:

### 1. Using `menu.[menuID].params.lang`

In `config.toml`:

```toml
[[menu.main]]
    identifier = "about"
    name = "About"
    url = "/about/"
    [menu.main.params]
        lang = "en"

[[menu.id.main]]
    identifier = "about"
    name = "Tentang"
    url = "/tentang/"
    [menu.main.params]
        lang = "id"
```

### 2. Using `menu.[lang].[menuID]`

In `config.toml`:

```toml
[[menu.en.main]]
    identifier = "about"
    name = "About"
    url = "/about/"

    [[menu.en.main]]
        identifier = "about-author"
        name = "Author"
        pageRef = "/about/author"
        parent = "about"

[[menu.id.main]]
    identifier = "about"
    name = "Tentang"
    url = "/tentang/"

    [[menu.id.main]]
        identifier = "about-author"
        name = "Tentang Penyusun"
        pageRef = "/tentang/penyusun"
        parent = "about"
```

### 3. Using Separate Menu Files

In `menus.en.toml`:

```toml
[[main]]
    identifier = "about"
    name = "About"
    url = "/about/"

    [[main]]
        identifier = "about-author"
        name = "Author"
        pageRef = "/about/author"
        parent = "about"
```

In `menus.id.toml`:

```toml
[[main]]
    identifier = "about"
    name = "Tentang"
    url = "/tentang/"

    [[menu.id.main]]
        identifier = "about-author"
        name = "Tentang Penyusun"
        pageRef = "/tentang/penyusun"
        parent = "about"
```

### 4. Using Front Matter in Markdown Files

in `index[.lang].md` `_index[.lang].md` or `filename[.lang].md`

```toml
---
title: "About Author"
menus: 
  main:
    indetifier: about-author
    parent: about
---
```
