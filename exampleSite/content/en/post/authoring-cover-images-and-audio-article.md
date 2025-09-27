---
title: "Authoring Cover Images and Audio Articles"
date: 2025-02-22
description: "A guide on adding cover images and audio articles"
draft: false
author: "Author Name"
type: "post"
tags: ["authoring", "content", "media", "audio", "cover", "images", "alt"]
categories: ["authoring"]
cover: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_and_styrofoam_%E2%80%93_electrostatic_charge_%28235112299%29.jpg'
alt: 'Cat named Cooper with styrofoam on his fur due to electrostatic charge.'
translationKey: 'media'
stage: 'budding'
bsky: "https://bsky.app/profile/808.foxx.ink/post/3lknem6ci2s2h"
---

## Adding Cover Images

### Assign The Cover Images

To add a cover image to your article, you have two options:

1. Front Matter Method

You can use either `cover` or `images` parameter for the images source.
And `alt`, `coverAlt` or `imagesAlt` parameter for alt text.

```yaml
---
title: "My Article"
images: "images/my-cover.jpg"
alt: "Description of the images"
---
```

2. Page Bundle Method

- Create a folder for your post
- Name your image `cover.*`
- Place it in the same folder as your content
- Set the alt text in your post frontmatter

### Place The Cover

You can place your featured images in various layout, anywhere on article content with `{{</* figure */>}}` shortcode:

```toml
{{</* figure src="cover" caption="alt" */>}}
```

This is freedom of authoring!

{{< figure src="cover" caption="alt" >}}


## Adding Audio Articles

1. Front Matter Method

```yaml
---
title: "My Article"
audio: "audio/my-audio.ogg"
---
```

2. Page Bundle Method

You can upload multiple audio format with this method:

- Create a folder for your post
- Name your audio `audio.*`
- Place it in the same folder as your content

## Page Bundle Method Examples

Here's how your folder structure should look:

    content/
    └── posts/
        └── my-article/
            ├── index.md
            ├── cover.jpg
            ├── audio.mp3
            └── audio.ogg