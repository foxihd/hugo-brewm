---
author : ['Author Name']
title: "Configure Discussion"
description: "How to configure post discussion in Hugo Brewm theme"
date: 2025-01-26
lastmod: 2025-02-10
type: post
draft: false
translationKey: discussion
coffee: 1
tags: ['configuration', 'discussion']
categories: ['configuration']
toot: "https://infosec.exchange/@foxx/113979609651534969"
bsky: "https://bsky.app/profile/foxx808.bsky.social/post/3lknem6ci2s2h"
---

## Linking discussions with Mastodon post

Link your Mastodon post URL to the front matter using either `toot`, `mstd`, or `mastodon` parameter.

```yaml
---
toot: https://example.com/@example/12345678901234567890
---
```

## Linking discussions with Bluesky post

Link your Mastodon post URL to the front matter using either `bsky` or `bluesky` parameter.

```yaml
---
bsky: https://bsky.app/profile/example.com/post/12345678901234
---
```

Note: You may need to estimating the article's permalink on your local preview before sharing on Fediverse platforms to obtain the post link, or you might need to run CI/CD operations twice.