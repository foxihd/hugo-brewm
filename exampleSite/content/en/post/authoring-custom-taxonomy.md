+++
author = ["Author Name"]
title = "Authoring Stage Taxonomy for Digital Garden"
date = "2025-07-28"
type = "post"
draft = false
coffee = 1
tags = ["authoring", "taxonomy"]
categories = ["authoring"]
stage = "evergreen"
history = [
  {date = "2025-07-26", stage="seedling"},
  {date = "2025-07-27", stage="budding"},
  {date = "2025-07-28", stage="evergreen"},
]
+++

This theme supports custom taxonomy and growth stage indicators, but it does not ship with an indicator icon right now.
<!--more-->
It must be manually set up as follows:

1. Register the taxonomy in your `config.toml`:

```toml
[taxonomies]
    stage = "stage"
```

2. Create taxonomy folder and it's terms `_index.md`:

```
mysite/
    ├── ...
    ├── content/
    │   └── stage/
    │       ├─ seedling/
    │       │   └─ _index.md
    │       ├─ budding/
    │       │   └─ _index.md
    │       └─ evergreen/
    │           └─ _index.md
    └── ...
```

3. Setup your custom indicator icon in `_index.md`:

```yaml
---
title: 'Evergreen'
translationKey: evergreen
indicator: 'https://example.com/indicator.svg'
---
```

4. Add the stage parameter into your post `index.md`:

```yaml
---
title: 'My Post'
stage: 'seedling'
---
```