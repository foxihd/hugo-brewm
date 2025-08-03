---
title: "Mengatur Logo dan Aksen Warna"
description: "Cara mengatur Logo di tema Hugo Brewm"
date: 2025-01-26
lastmod: 2025-02-21
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
    /* default contrast */
    --ac-light: #36c;      /* warna aksen pada kontras default */
    --fg-light: #111;      /* warna latar depan pada kontras default */
    --bg-light: #f9f9fb; /* warna latar belakang pada kontras default */
    --midtone: gray;       /* warna midtone pada kontras default */
    --fg-dark: #f9f9fb;  /* warna latar depan pada mode gelap, kontras default */
    --bg-dark: #111;       /* warna latar belakang pada mode gelap, kontras default */
    --ac-dark: #fa0;       /* warna aksen pada mode gelap, kontras default */

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

File ini akan menggantikan custom.css dalam tema. Untuk menghindari hilangnya variabel warna selama pembuatan, harap salin setiap variabel dan jangan hapus apa pun selain komentar.

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