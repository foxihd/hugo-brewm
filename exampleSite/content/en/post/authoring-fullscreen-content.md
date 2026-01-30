---
title: "Authoring Fullscreen Content"
date: 2026-01-29
description: "A guide on creating pages with fullscreen layout"
draft: false
author: "Author Name"
type: "post"
tags: ["authoring", "content", "media", "map"]
categories: ["authoring"]
cover: ''
alt: ''
translationKey: 'media'
stage: 'evergreen'
bsky: ""
---

## Creating a Fullscrenn Page

To embed any form of iframe in a fullscreen way, for example a map, create a content page like this:
```yaml
---
title: "Example Fullscreen Map"
date: 2026-01-28
type: "fullscreen"
fullscreen_link: "https://www.openstreetmap.org/"   #Define link in footer
fullscreen_link_text: "open in fullscreen"          #Definie link-text in footer
---
<iframe src="https://www.openstreetmap.org/export/embed.html" width="100%" height="100%" style="border:none; "></iframe>
```

To allow html in markdown documents, you have to enable unsafe-html in your `hugo.toml` file:

```yaml
    ## Goldmark markdown processor settings
    [markup.goldmark]
        [markup.goldmark.renderer]
            ## Allow HTML in markdown
            unsafe = true
```

## Example
[Fullscreen Example](/en/fullscreen-example)