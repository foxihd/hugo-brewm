---
title: "Menambahkan Gambar Sampul dan Artikel Audio"
date: 2025-02-22
description: "Panduan menambahkan gambar sampul dan artikel audio"
draft: false
type: "post"
tags: ["authoring", "konten", "media", "audio", "sampul", "gambar", "alt"]
cover: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_and_styrofoam_%E2%80%93_electrostatic_charge_%28235112299%29.jpg'
alt: 'Kucing bernama cooper dengan gabus yang menempel pada bulu karena elektrostatis.'
translationKey: 'media'
---
## Menambahkan Gambar Sampul

### Menambahkan Gambar ke Parameter

Untuk menambahkan gambar sampul ke artikel Anda, ada dua pilihan:

1. Metode _Front Matter_

Anda dapat menggunakan parameter `cover` atau `images` untuk sumber gambar.
Dan parameter `alt`, `coverAlt` atau `imagesAlt` untuk teks _alt_.

```yaml
---
title: "Artikel Saya"
images: "images/my-cover.jpg"
alt: "Deskripsi gambar"
---
```

2. Metode _Page Bundle_

- Buat folder untuk artikel Anda
- Beri nama gambar Anda `cover.*`
- Letakkan di folder yang sama dengan konten Anda
- Atur teks _alt_ di _frontmatter_ artikel

### Menambahkan Gambar ke Badan Artikel

Anda dapat menambahkan gambar dalam berbagai layout, dimana saja di badan artikel dengan _shortcode_ `{{</* figure */>}}`:

```toml
{{</* figure src="cover" caption="alt" */>}}
```

Ini adalah kebebasan untuk menata artikel!

{{< figure src="cover" caption="alt" >}}

## Menambahkan Artikel Audio

1. Metode _Front Matter_

```yaml
---
title: "Artikel Saya"
audio: "audio/my-audio.ogg"
---
```


2. Metode _Page Bundle_

Anda dapat mengunggah beberapa format audio dengan metode ini:

- Buat folder untuk artikel Anda
- Beri nama audio Anda `audio.*`
- Letakkan di folder yang sama dengan konten Anda

## Contoh Metode _Page Bundle_

Berikut bagaimana struktur folder pada metode _page bundle_:

    content/
    └── posts/
        └── my-article/
            ├── index.md
            ├── cover.jpg
            ├── audio.mp3
            └── audio.ogg