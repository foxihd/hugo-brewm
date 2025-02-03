---
title: "Configure Discussion"
description: "How to configure post discussion in Hugo Brewm theme"
date: 2025-01-26
lastmod: 2025-02-03
type: post
draft: false
translationKey: discussion
coffee: 1
tags: ['configuration', 'discussion']
categories: ['configuration']
---

You can integrate discussions from you Fediverse instance to you article. To enable this feature, add the `fediverse` section to your front matter with the required `host`, `user`, and `post` parameters:

```yaml
---
title: "Example"
type: "post"
fediverse:
    host: fediverse.instance
    user: user-name
    post: 123456789012345678
---
```

If you are single author, you can set the `host` and `user` parameter globally in the `config.toml` file:

```toml
[params]
    [params.fediverse]
    host = "example.com"
    user = "username"
```

You might need to preview the article's permalink before sharing it on the Fediverse network to get post ID, or perform CI/CD twice.