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

Anda dapat mengintergasikan diskusi dari postingan Fediverse anda dengan artikel. Untuk mengaktifkan fitur ini, tambahkan bagian `fediverse` ke front matter Anda dengan parameter `host`, `user`, dan `post` yang diperlukan:

```yaml
---
title: "Contoh"
type: "post"
fediverse:
    host: fediverse.instance
    user: user-name
    post: 123456789012345678
---
```

Jika Anda adalah penulis tunggal, Anda dapat mengatur parameter `host` dan `user` secara global di file `config.toml`:

```toml
[params]
    [params.fediverse]
    host = "example.com"
    user = "username"
```

Anda mungkin perlu melihat pratinjau permalink artikel sebelum membagikannya di jaringan Fediverse, atau melakukan CI/CD dua kali.