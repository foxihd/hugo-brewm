---
title: "Mengatur Pagefind"
description: "Panduan untuk mengatur pencarian Pagefind di tema Hugo Brewm"
date: 2025-01-26
type: 'post'
draft: false
translationKey: pagefind
coffee: 1
---

## Menautkan diskusi dengan postingan Mastodon

Tautkan URL postingan Mastodon ke front matter menggunakan parameter `toot`, `mstd`, atau `mastodon`.

```yaml
---
toot: https://example.com/@example/12345678901234567890
---
```

## Menautkan diskusi dengan postingan Bluesky

Tautkan URL postingan Bluesky ke front matter menggunakan parameter `bsky` atau `bluesky`.

```yaml
---
bsky: https://bsky.app/profile/example.com/post/12345678901234
---
```

Catatan: Anda mungkin perlu memperkirakan permalink artikel pada pratinjau lokal sebelum membagikan ke platform Fediverse untuk mendapatkan tautan postingan, atau Anda mungkin perlu menjalankan operasi CI/CD dua kali.