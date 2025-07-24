---
author : ['Author Name']
title: "Configure Homepage Slides"
description: "How to configure Homepage Slides section in Hugo Brewm theme"
date: 2025-01-26
type: post
draft: false
translationKey: slide
coffee: 1
tags: ['configuration', 'slide']
categories: ['homepage']
---

## Setting up slide content

The Hugo Brewm theme features a homepage slides section that showcases important content through an interactive carousel.
{{< marginpar >}}You can add a `cover` parameter to add a slide cover; this parameter also changes the slide layout.{{< /marginpar >}}
To create multiple slides, you'll need to make separate files containing this front matter structure:

```yaml
---
type: slide
title: "Slide Title"
textColor: black # change textcolor to `black` or `white` and set background transparent
params:
    headless: true # prevent page body to be render and redirect to 404.html
    target: "https://example.com" # override the redirect target
---
```

## Dedicated Shortcode for Slide Content

### External RSS feeds

The slides section can integrate content from external sources using the RSS shortcode.

```yaml
---
type: slide
title: "My post on example.com"
---

{{</* rss "https://example.com/feed.xml" */>}}
```

### Gallery with Masonry layout

For a Pinterest-style layout, you can implement the pin shortcode as follows:

```toml
{{</* pin "begin" */>}}
{{</* pin img="https://example.com/item1.jpg" url="https://example.com/item1" label="Item 1" */>}}
{{</* pin img="https://example.com/item2.jpg" url="https://example.com/item2" label="Item 2" */>}}
{{</* pin img="https://example.com/item3.jpg" url="https://example.com/item3" label="Item 3" */>}}
{{</* pin img="https://example.com/item4.jpg" url="https://example.com/item4" label="Item 4" */>}}
{{</* pin img="https://example.com/item5.jpg" url="https://example.com/item5" label="Item 5" */>}}
{{</* pin img="https://example.com/item6.jpg" url="https://example.com/item6" label="Item 6" */>}}
{{</* pin "end" */>}}
```