---
title: "Configure Discussion"
description: "How to configure post discussion in Hugo Brewm theme"
date: 2025-01-26
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

You might need to preview the article's permalink before sharing it on the Fediverse network, or perform CI/CD twice.