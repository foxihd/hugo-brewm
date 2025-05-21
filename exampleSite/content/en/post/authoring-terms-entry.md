---
author : ['Author Name', 'A.N. Other']
title: "Authoring Terms Entry"
description: "How to set the cover and linking of terms entry in Hugo Brewm theme"
date: 2025-02-03
type: post
draft: false
translationKey: terms
coffee: 1
tags: ['authoring', 'cover', 'taxonomy', 'terms']
categories: ['authoring']
stage: [seedling]
---

You can change the cover of each terms entry by adding the `cover` parameter in `_index.md` under `[lang]\[taxonomies]\[terms]\`.
For example, to set the cover of the term `configuration` in categories, add the parameter in `content\en\categories\configuration\_index.md`.

```yaml
---
title: "Configuration"
description: "Configuration description, this might be useful for HTML metadata"
cover: "https://example.com/cover.png"
translationKey: configuration
---

If something is written here, the text will be displayed as hero section.
```

To link the terms entry in another language, you can add the `translationKey` parameter.
For example, if you want to link the terms entry in Indonesian, add the parameter in `content\id\categories\konfigurasi\_index.md`.

```yaml
---
title: "Konfigurasi"
description: "Deskripsi konfigurasi, ini bisa berguna untuk metadata HTML"
cover: "https://example.com/cover.png"
translationKey: configuration
---

Jika ada teks yang ditulis di sini, teks akan ditampilkan sebagai bagian hero.
```

The same way, you can set the cover of each terms entry for `series` and `author` taxonomies.
After making these changes, rebuild your site to see the updated cover and translations in breadcrumbs.
The cover will replace the flowlines images on taxonomies listing.