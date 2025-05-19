---
title: "Menambahkan Diskusi"
description: "Cara menambahkan diskusi postingan di tema Hugo Brewm"
date: 2025-01-26
lastmod: 2025-02-03
type: 'post'
draft: false
translationKey: discussion
coffee: 1
---

## Mengatur Komentar Giscus

Untuk mengaktifkan komentar Giscus di situs Hugo Anda, ikuti langkah-langkah berikut:

1. Pertama, pasang [Aplikasi GitHub Giscus](https://github.com/apps/giscus) di repositori Anda
2. Tambahkan parameter berikut ke `config.toml` Anda:

```toml
[params.giscus]
    repo = "username/repository"
    repoID = "R_kgDxxxxxxxx"
    category = "Announcements"
    categoryID = "DIC_kwDxxxxxxxxxxxxxxxx"
```

Ganti kata-kunci berikut:
- `repo`: Nama pengguna dan repositori GitHub Anda
- `repoID`: ID repositori Anda (dapatkan dari situs Giscus)
- `category`: Nama kategori diskusi
- `categoryID`: ID kategori diskusi (dapatkan dari situs Giscus)

Anda bisa mendapatkan kata-kunci tersebut dengan mengunjungi [Giscus.app](https://giscus.app) dan mengatur preferensi Anda.

Parameter berikut juga dapat dikonfigurasi secara opsional:

```toml
    mapping = "pathname"
    strict = "0"
    reactionsEnabled = "1"
    emitMetadata = "0"
    inputPosition = "bottom"
    theme = "preferred_color_scheme"
    loading = "lazy"
```

3. Secara default, komentar Giscus akan muncul di semua postingan. Untuk menonaktifkan komentar pada postingan tertentu, gunakan parameter front matter:

```yaml
---
comments: false  # Nonaktifkan komentar untuk postingan ini
---
```

## Mengatur Integrasi Media Sosial
Tema ini mendukung penyematan komentar dari Bluesky atau Mastodon atau kedua platform sosial tersebut.
Ketika Anda menyertakan tautan ke postingan Bluesky atau Mastodon di front matter, Giscus akan diganti secara otomatis.

### Menautkan diskusi dengan postingan Mastodon

Tautkan URL postingan Bluesky ke front matter menggunakan parameter `toot`, `mstd`, atau `mastodon`.

```yaml
---
toot: https://example.com/@example/12345678901234567890
---
```

### Menautkan diskusi dengan postingan Bluesky

Tautkan URL postingan Mastodon ke front matter menggunakan parameter `skeet`, `bsky` atau `bluesky`.

```yaml
---
skeet: https://bsky.app/profile/example.com/post/12345678901234
---
```

Catatan: Anda mungkin perlu memperkirakan permalink artikel pada pratinjau lokal sebelum membagikan ke platform Fediverse untuk mendapatkan tautan postingan, atau Anda mungkin perlu menjalankan operasi CI/CD dua kali.