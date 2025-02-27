---
title: "Mengatur Footer Utama"
description: "Cara mengatur footer utama di tema Hugo Brewm"
date: 2025-01-26
draft: false
translationKey: mainfooter
coffee: 1
---

Footer utama di tema Hugo Brewm dapat disesuaikan melalui beberapa opsi konfigurasi. Berikut cara mengatur berbagai komponen footer.

## Mengatur Judul dan Konten Footer

Untuk mengatur konten footer utama, buat file markdown di direktori konten Anda dengan front matter berikut:

```yaml
---
type: footer
title: "Judul Footer Utama Anda"
weight: 1
params:
    headless: true # cegah pembuatan halaman dan alihkan ke 404.html
    target: "https://example.com" # atau alihan ke target
---
```

Anda kemudian dapat menambahkan konten footer di bawah front matter menggunakan markdown.
Beberapa bagian footer dapat dibuat menggunakan file markdown yang berbeda.

## Mengatur Item Menu Footer

Item menu footer dapat dikonfigurasi di file config.toml situs Anda. Berikut cara menambahkan item menu:

```toml
[[menu.footer]]
    identifier = "github"       # Pengenal unik untuk item menu
    name = "GitHub"             # Nama tampilan/tooltip
    url = "https://github.com/" # URL tautan
    pre = "github"              # Ikon
```

## Mengaktifkan Statistik Kopi

Jika Anda ingin menampilkan statistik kopi di footer Anda, aktifkan di config.toml:

```toml
[params]
    coffeeStat = true    # Atur ke false untuk menonaktifkan
```

Setiap parameter `coffee` di frontmatter konten Anda akan dihitung dan ditampilkan di footer.