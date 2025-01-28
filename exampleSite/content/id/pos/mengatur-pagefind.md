---
title: "Mengatur Pagefind"
description: "Panduan untuk mengatur pencarian Pagefind di tema Hugo Brewm"
date: 2025-01-26
type: 'post'
draft: false
translationKey: pagefind
coffee: 1
---

## Mengatur pencarian di konfigurasi Hugo

Untuk mengaktifkan fungsi pencarian, Anda perlu memodifikasi file `config.toml`. Pertama, aktifkan tombol pencarian menggunakan `.params.search`. Kemudian aktifkan `.params.pagefind`, jika Anda melewatkan langkah ini, tema akan menggunakan DuckDuckGo sebagai default.

```toml
[params]
  search = true
  pagefind = true
```

## Mengatur frontmatter pos

Untuk membuat pos terindeks, Anda perlu mengatur `type` menjadi `post` pada frontmatter setiap pos.

```yaml
---
title: "Pos"
type: post
---
```

## Mengatur pipeline CI/CD

Untuk membuat indeks pencarian, tambahkan perintah ini ke langkah build pipeline CI/CD Anda:

```yaml
- name: Index pagefind
  run: npx pagefind --source "public"
```