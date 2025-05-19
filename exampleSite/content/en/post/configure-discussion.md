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
bsky: "https://bsky.app/profile/808.foxx.ink/post/3lknem6ci2s2h"
---

## Configure Giscus Comments

To enable Giscus comments on your Hugo site, follow these steps:

1. First, install the [Giscus GitHub App](https://github.com/apps/giscus) on your repository
2. Add the following parameters to your `config.toml`:

```toml
[params.giscus]
    repo = "username/repository"
    repoID = "R_kgDxxxxxxxx"
    category = "Announcements"
    categoryID = "DIC_kwDxxxxxxxxxxxxxxxx"
```
Replace the following values:
- `repo`: Your GitHub username and repository name
- `repoID`: Your repository ID (get from Giscus website)
- `category`: The discussion category name
- `categoryID`: The discussion category ID (get from Giscus website)

You can generate these values by visiting [Giscus.app](https://giscus.app) and configuring your preferences.
The following parameters can be optionally configured:

```toml
    mapping = "pathname"
    strict = "0"
    reactionsEnabled = "1"
    emitMetadata = "0"
    inputPosition = "bottom"
    theme = "preferred_color_scheme"
    loading = "lazy"
```

3. By default, Giscus comments will appear on all posts. To disable comments on specific posts, use the front matter parameter:

```yaml
---
comments: false  # Disable comments for this post
---
```

## Configure Social Media Integration
The theme supports embedding comments from Bluesky or Mastodon or both social platforms.
When you include links to your Bluesky or Mastodon posts in the front matter, the Giscus will be automatically replaced.

### Linking discussions with Mastodon post

Link your Mastodon post URL to the front matter using either `toot`, `mstd`, or `mastodon` parameter.

```yaml
---
toot: https://example.com/@example/12345678901234567890
---
```

### Linking discussions with Bluesky post

Link your Bluesky post URL to the front matter using either `skeet`, `bsky` or `bluesky` parameter.

```yaml
---
skeet: https://bsky.app/profile/example.com/post/12345678901234
---
```

Note: You may need to estimating the article's permalink on your local preview before sharing on Fediverse platforms to obtain the post link, or you might need to run CI/CD operations twice.