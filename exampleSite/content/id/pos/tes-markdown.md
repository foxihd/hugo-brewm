---
title: "Tes Markdown"
description: "Berbagai contoh tes Markdown"
date: 2025-01-26
type: 'post'
draft: false
translationKey: markdown
coffee: 1
---

<span class="letterine"><i>I</i>ni adalah contoh span dengan kelas letterine.</span>
Anda perlu mengatur parameter `markup.goldmark.unsafe` dan `markup.goldmark.renderer.unsafe` di `config.toml` untuk menulis html secara langsung, tetapi ini tidak direkomendasikan.
{{< marginpar >}}
Dan ini adalah marginpar.
**Teks tebal**,
*Teks miring*,
***Teks tebal dan miring***,
~~Teks dicoret~~,
[Teks tautan](https://example.com)
---juga berfungsi.
{{< /marginpar >}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Judul 2

Paragraf pertama tidak akan menjorok.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Paragraf kedua dan setelahnya akan menjorok.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> Ini adalah kutipan
>> Kutipan bertumpuk

### Judul 3

1. Item daftar terurut 1
2. Item daftar terurut 2
   - Item tidak terurut bersarang
   - Item bersarang lainnya
3. Item daftar terurut 3

- Item daftar tidak terurut
- Item lainnya
  - Item bersarang
  - Item bersarang lainnya

#### Judul 4

![Teks alternatif gambar](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Domestic_cat_sitting_by_door.jpg/640px-Domestic_cat_sitting_by_door.jpg)

| Header 1 | Header 2 |
|----------|----------|
| Sel 1    | Sel 2    |
| Sel 3    | Sel 4    |

Daftar tugas:
- [x] Tugas selesai
- [ ] Tugas belum selesai

##### Judul 5

Ini adalah `kode dalam baris` dan beberapa pemformatan ***gabungan***.

Ini adalah blok kode:

    // blok kode dengan empat spasi
    def hello_world():
        print("Halo, Dunia!")

```js
// Blok kode dengan penyorotan sintaks
function salam(nama) {
    return `Halo, ${nama}!`;
}
```

###### Judul 6

Tingkat judul 6 akan ditampilkan sebagai paragraf dalam baris.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.