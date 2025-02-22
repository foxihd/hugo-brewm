---
title: "Menambahkan Gambar Sampul dan Artikel Audio"
date: 2025-02-22
description: "Panduan menambahkan gambar sampul dan artikel audio"
draft: false
type: "post"
tags: ["authoring", "konten", "media", "audio", "sampul", "gambar", "alt"]
---
## Menambahkan Gambar Sampul

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