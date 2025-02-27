---
title: "Mengatur Slide Beranda"
description: "Cara mengatur Bagian Slide Beranda di tema Hugo Brewm"
date: 2025-01-26
type: 'post'
draft: false
translationKey: slide
coffee: 1
---

## Menyiapkan konten slide

Tema Hugo Brewm memiliki bagian slide beranda yang menampilkan konten penting melalui carousel interaktif.
{{< marginpar >}}Anda dapat menambahkan parameter `cover` untuk menambahkan sampul slide; parameter ini juga mengubah tata letak slide.{{< /marginpar >}}
Untuk membuat beberapa slide, Anda perlu membuat file terpisah yang berisi struktur front matter seperti ini:

```yaml
---
type: slide
title: "Judul Slide"
params:
    headless: true # cegah pembuatan halaman dan alihkan ke 404.html
    target: "https://example.com" # atau alihan ke target
---
```

## Shortcode Khusus untuk Konten Slide

### Feed RSS eksternal

Bagian slide dapat mengintegrasikan konten dari sumber eksternal menggunakan shortcode RSS.

```yaml
---
type: slide
title: "Postingan saya di example.com"
---

{{</* rss "https://example.com/feed.xml" */>}}
```

### Galeri dengan tata letak Masonry

Untuk gallery dengan tata letak gaya Pinterest, Anda dapat mengimplementasikan shortcode pin seperti berikut:

```toml
{{</* pin "begin" */>}}
{{</* pin img="https://example.com/item1.jpg" url="https://example.com/item1" label="Item 1" */>}}
{{</* pin img="https://example.com/item2.jpg" url="https://example.com/item2" label="Item 2" */>}}
{{</* pin img="https://example.com/item3.jpg" url="https://example.com/item3" label="Item 3" */>}}
{{</* pin img="https://example.com/item4.jpg" url="https://example.com/item4" label="Item 4" */>}}
{{</* pin img="https://example.com/item5.jpg" url="https://example.com/item5" label="Item 5" */>}}
{{</* pin img="https://example.com/item6.jpg" url="https://example.com/item6" label="Item 6" */>}}
{{</* pin "end" */>}}
```