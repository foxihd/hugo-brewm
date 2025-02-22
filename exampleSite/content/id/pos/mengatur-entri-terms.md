---
title: "Mengatur Entri `Terms`"
description: "Cara mengatur cover dan menghubungkan entri `terms` di tema Hugo Brewm"
date: 2025-02-03
type: post
draft: false
translationKey: terms
coffee: 1
tags: ['authoring', 'cover', 'taxonomy', 'terms']
---

Anda dapat mengubah cover untuk setiap _entry terms_ dengan menambahkan parameter `cover` di `_index.md` di bawah `[bahasa]\[taksonomi]\[terms]\`.
Sebagai contoh, untuk mengatur cover dari term `kongigurasi` di categories, tambahkan parameter di `content\id\categories\konfigurasi\_index.md`.

```yaml
---
title: "Konfigurasi"
description: "Deskripsi konfigurasi, ini bisa berguna untuk metadata HTML"
cover: "https://example.com/cover.png"
translationKey: konfigurasi
---

Jika ada teks yang ditulis di sini, teks akan ditampilkan sebagai bagian hero.
```

Untuk menghubungkan _entry terms_ dalam bahasa lain, Anda dapat menambahkan parameter `translationKey`.
Sebagai contoh, jika Anda ingin menghubungkan _entry terms_ dalam bahasa Indonesia, tambahkan parameter di `content\id\categories\konfigurasi\_index.md`.

```yaml
---
title: "Configuration"
description: "Configuration description, this might be useful for HTML metadata"
cover: "https://example.com/cover.png"
translationKey: konfigurasi
---

Jika ada teks yang ditulis di sini, teks akan ditampilkan sebagai bagian hero.
```

Dengan cara yang sama, Anda dapat mengatur cover untuk setiap _entry terms_ untuk taksonomi `series` dan `author`.
Setelah membuat perubahan ini, bangun ulang situs Anda untuk melihat pembaruan cover dan terjemahan di breadcrumbs.
Cover akan menggantikan gambar _flowlines_ pada daftar taksonomi.