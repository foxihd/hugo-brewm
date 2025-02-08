---
author : ['Author Name']
title: "Configure Pagefind"
description: "How to configure Pagefind in Hugo Brewm theme"
date: 2025-01-26
type: post
draft: false
translationKey: pagefind
coffee: 1
tags: ['configuration', 'pagefind']
categories: ['configuration']
---

## Setting up search in Hugo configuration

To enable search functionality, you'll need to modify your `config.toml` file. First, enable the search button using `.params.search`. Then activate `.params.pagefind`, if you skip this step, the theme will default to using DuckDuckGo instead.

```toml
[params]
  search = true
  pagefind = true
```

## Setting up post frontmatter

To make post indexed, you'll need to set `type` to `post` to the frontmatter of each post.

```yaml
---
title: "Post"
type: post
---
```

## Setting up your CI/CD pipeline

To create the search index, add this command to your CI/CD pipeline's build step:

```yaml
- name: Index pagefind
  run: npx pagefind --source "public"
```