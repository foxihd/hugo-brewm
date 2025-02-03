---
title: "Mengatur Logo dan Aksen Warna"
description: "Cara mengatur Logo di tema Hugo Brewm"
date: 2025-01-26
lastmod: 2025-02-03
type: 'post'
draft: false
translationKey: logo
coffee: 1
---

Tema Hugo Brewm memungkinkan Anda untuk dengan mudah mengatur logo dan aksen warna situs Anda. Ikuti langkah-langkah berikut untuk mengatur logo Anda:

## Mengubah Aksen Warna

Untuk membuat aksen warna sesuai dengan identitas merek Anda, Anda dapat menyesuaikan warna aksen di `custom.css` yang berada di dalam `assets/css`.
Sebagai contoh, di `exampleSite/assets/css/custom.css`:

```css
:root {
    --ac-light: #36b;
    --ac-dark: #fa1;
}
```

## Menambahkan Gambar Logo / Ikon LogoMark

> Siapkan gambar logo Anda
>
> - Buat atau siapkan file gambar logo Anda (format yang disarankan: PNG atau SVG)
> - Untuk hasil terbaik, gunakan gambar dengan latar belakang transparan
> - Dimensi yang disarankan: tinggi 50px hingga 70px
> - Anda juga dapat menambahkan versi mode gelap dari logo Anda

Atur logo(mark) di konfigurasi situs Anda:

```toml
[params]
    logoMark = 'https://example.com/logoMark.svg' 
    logoMarkDark = 'https://example.com/logoMarkDark.svg' #opsional
```

## Menggunakan Preset Logo Type

Jika Anda lebih suka tidak menggunakan logo gambar, Anda dapat mengaktifkan logo berbasis teks bawaan dengan menambahkan pengaturan ini:

```toml
[params]
    logoType = true
```

Setelah membuat perubahan ini, bangun ulang situs Anda untuk melihat logo yang diperbarui. Logo akan secara otomatis muncul di header situs dan akan responsif di berbagai ukuran perangkat.