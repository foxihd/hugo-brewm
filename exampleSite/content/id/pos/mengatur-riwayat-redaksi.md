+++
title = "Mengatur Riwayat Redaksi"
description = "Cara mengatur riwayat redaksi di tema Hugo Brewm"
date = "2025-02-03"
type = "post"
draft = false
translationKey = "history"
coffee = 1
tags = ["authoring", "redaksi", "riwayat"]
history = [
  {date = "2025-02-01", author = "Nama Penulis", reviewer = "Nama Pengulas", note = "Contoh"},
  {date = "2025-02-02", author = "Nama Penulis", editor = "Nama Editor", note = "Addendum (contoh)"},
  {date = "2025-02-03", note = "Errata (contoh)"},
]
+++

Fungsi riwayat redaksi memungkinkan Anda untuk melacak dan mengkomunikasikan modifikasi konten kepada pembaca.
Di dalam front matter artikel, Anda dapat menentukan detail seperti `editor`, `reviewer`, dan menyertakan catatan penjelasan (`note`) tentang perubahan yang dilakukan.
Fitur ini memerlukan konfigurasi manual di bagian front matter artikel.

```toml
+++
title = "Mengatur Riwayat Redaksi"
history = [
    {date = "2025-02-01", author = "Nama Penulis", reviewer = "Nama Pengulas", note = "Contoh"},
    {date = "2025-02-02", author = "Nama Penulis", editor = "Nama Editor", note = "Addendum (contoh)"},
    {date = "2025-02-03", note = "Errata (contoh)"},
    ]
+++
```

Garis waktu kronologis yang menampilkan informasi ini akan muncul di bawah bagian informasi artikel, seperti yang ditunjukkan dalam contoh artikel ini.