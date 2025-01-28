---
title: "Mengatur Menu"
description: "Cara mengatur menu di tema Hugo Brewm"
date: 2025-01-26
type: 'post'
draft: false
translationKey: menus
coffee: 1
---

Pelajari cara mengatur menu di tema Hugo Brewm menggunakan file `config.toml` atau `menus[.lang].toml`.

## Parameter Menu

- `identifier`: Pengenal unik untuk setiap item menu
- `name`: Teks yang ditampilkan di menu
- `url`: Tujuan tautan eksternal
- `pageRef`: Tautan ke halaman internal
- `weight`: Pengurutan item menu (angka lebih kecil lebih dulu)
- `pre`: Setel ikon
- `post`: Deskripsi untuk tautan
- `parent`: Referensi item menu induk

## Menambahkan Ikon

Tambahkan ikon ke item menu Anda dengan parameter `pre`. Saat ini, hanya ikon yang tedapat pada font yang didukung:

```toml
[[menu.main]]
    identifier = "github"
    name = "GitHub"
    url = "https://github.com/"
    pre = "github"
```

## Membuat Menu Bertingkat

Buat menu dropdown dengan menggunakan parameter `parent`:

```toml
[[menu.main]]
    identifier = "about"
    name = "Tentang"
    pageRef = "/about"

    [[menu.main]]
        identifier = "about-author"
        name = "Penulis"
        pageRef = "/about/author"
        parent = "about"
```

## Dukungan Bahasa

Ada empat cara untuk menambahkan dukungan multi-bahasa ke menu Anda:

### 1. Menggunakan `menu.[menuID].params.lang`

Di `config.toml`:

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

### 2. Menggunakan `menu.[lang].[menuID]`

Di `config.toml`:

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

### 3. Menggunakan File Menu Terpisah

Di `menus.en.toml`:

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

Di `menus.id.toml`:

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

### 4. Menggunakan Front Matter di File Markdown

di `index[.lang].md` `_index[.lang].md` atau `filename[.lang].md`

```toml
---
title: "Tentang Penulis"
menus: 
  main:
    indetifier: about-author
    parent: about
---
```
