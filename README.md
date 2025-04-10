# Hugo Brewm

> Fine-brewed Hugo theme made open.

Demosite: [https://foxihd.github.io/hugo-brewm/en/](https://foxihd.github.io/hugo-brewm/en/)

![A11y Console](https://repository-images.githubusercontent.com/923527728/46a32a19-69ac-45b3-91a4-c4d299fb234b)

## Feature Highlights

- **Reader-first**: Prioritizes privacy, readability and accessibility with personalized  settings for colors, fonts, BionRead and focus mode (It's Tracker Free!).
- **Inclusive**: Graceful degradation design oriented with improved semantic HTML structure & WAI-ARIA attribute, the site remains fully functional even when JavaScript is disabled!
- **Scalable**: Support for multiple authors and languages, optional Pagefind search, external feed over RSS, Giscus and Fediverse-powered commenting system.
- **Frameworkless**: Lower maintenance & carbon footprint by lesser resource usage.

## Translation

We currently only support Indonesian and English.
Please feel free to contribute to additional [translation](https://github.com/foxihd/hugo-brewm/blob/main/i18n/).

## Getting Started: Blog with Hugo and hugo-brewm

### Installation

1. Create a new Hugo site (for an existing hugo site, skip to step 2) :

```sh
hugo new site mysite
cd mysite
git init
```

2. Add this theme as a Git submodule:

```sh
git submodule add https://github.com/foxihd/hugo-brewm themes/hugo-brewm
```

3. Update your site's configuration in `config.toml`:

```sh
theme = "hugo-brewm"
```

### Configuration

The following configuration options are available for hugo-brewm:

```toml
## Base URL for the site
baseURL = 'https://example.com'
## Site title
title = 'Example'
## Use hugo-brewm theme
theme = 'hugo-brewm'
## Enable Git information for pages, (e.g. lastMod date information)
enableGitInfo = true
## Convert all URLs to absolute URLs
canonifyURLs = true
## Default language for content
defaultContentLanguage = 'en'
## Put default language in subdirectory
defaultContentLanguageInSubdir = true
## Generate a robots.txt
enableRobotsTXT = true
## Use sections for main menu
# sectionPagesMenu = 'main'
## Files to ignore when building site
ignoreFiles = [ '\.redacted', '\.old','\.bak', '\.tmp', '\.swp', '\.DS_Store']

## markup configuration
[markup]

    [markup.highlight]
        ## Enable code fence highlighting
        codeFences = true
        ## Use hugo-brewm classes for verbatim styling
        noClasses = false

## Sitemap configuration
[sitemap]
    ## Change frequency setting (will affect posts listings layout): 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
    changeFreq = 'monthly'

## Site parameters
[params]
    ## Site title
    title = "Example"
    ## Site description
    description = "An ExampleSite built with Hugo and Hugo-Brewm theme"
    ## Copyright notice, not implemented yet
    # copyright = "Copyright 2025 (c) Author"
    ## Enable extended metadata (social cards)
    extMeta = true
    ## Enable coffee metric
    coffeeStat = true
    ## Default social card image, recommended resolution: 1200 x 630px
    # images = "example.com/img/social-share.jpg" 


    ## Author information
    [params.author]
        ## site author's name
        name = 'Author Name'
        ## Author's email
        email = 'email@example.com'
        ## Other method to customize author and co-authors information
        coauthor = [
            {name = "A.N. Other", bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        ]

    ## Comments configuration
    [params.comments]
        ## Disable comments (disable fediverse comments)
        disabled = false
        ## Comment platform selection, pending rule implementation
        # platform = 'giscus'

    ## Favicon configuration
    [params.favicon]
        # png = '/favicon-96x96.png'
        # svg = '/favicon.svg'
        # ico = '/favicon.ico'
        # apple = '/apple-touch-icon.png'
        # appTitle = 'App Title'
        # webmanifest = '/site.webmanifest'

    ## Fediverse integration settings for verification
    [params.fediverse]
        ## Fediverse instance URL
        instance = 'example.com'
        ## Fediverse username
        username = 'username'

    ## Feed display settings
    [params.feed]
        ## Enable flowlines
        flowlines = true
        ## Limit number of flowlines with maximum 42
        flowlinesLimit = 21

    ## Giscus configuration
    [params.giscus]
        ## Repository name
        repo = "username/repository"
        ## Repository ID
        repoID = "R_xxx"
        ## Discussion category
        category = "Comments"
        ## Category ID
        categoryID = "DIC_xxx"
        ## Discussion mapping
        mapping = "og:title"
        ## Enable reactions
        reactionsEnabled = "1"
        ## Emit discussion metadata
        emitMetadata = "0"
        ## Comment input box position
        inputPosition = "bottom"
        ## Color theme
        theme = "light"
        ## Loading behavior
        loading = "lazy"

    ## Home page display settings
    [params.home]
        ## Disable slide carousel
        disableSlide = false
        ## Disable taxonomy listing carousel
        disableListing = false

    ## Logo configuration
    [params.logo]
        ## Light mode logo mark
        logoMark = 'https://example.com/logoMark.svg'
        ## Dark mode logo mark
        logoMarkDark = 'https://example.com/logoMarkDark.svg'
        ## Enable logo type
        logoType = true

    ## Post display settings
    [params.posts]
        ## Enable text justification
        justifying = false
        ## Disable paragraph indentation
        noIndent = false
        ## Show colophon section (including QR code)
        colophon = true
        ## disable redaction history
        disableHistory = false
        ## SHow related content
        related = true
        ## Show share buttons
        share = true

    ## Search configuration
    [params.search]
        ## Enable search functionality, please index your site first
        enable = true
        ## Use pagefind search when javascript enabled, currently only 'pagefind' is supported, further options to be determined
        pagefind = true
        ## fallback searchbox when javascript disabled, currently the options limited to 'mojeek', otherwise duckduckgo will be used
        # fallback = 'mojeek'

    ## Extended Metadata and Social card configuration
    [params.socialCard]
        ## Enable twitter and opengraph social cards (same as .params.extMeta)
        enable = true
        ## Default social card image, same as .Params.images
        # images = "img/social-share.jpg" 
        ## Enable Twitter cards
        # twitter = true
        ## Twitter creator handle
        # twitterCreator = "@username"
        ## Twitter site handle
        # twitterSite = "@username"

        ## Enable OpenGraph
        # opengraph = true
        ## Facebook App ID
        # facebookAppID = "123456789"
        ## Facebook Admin ID
        # facebookAdmin = "USER_ID"

        ## Schema.org (EXPERIMENTAL, not fully supported body tags)
        # schema = true
        ## JsonLD (EXPERIMENTAL, cannot validate permalink)
        # jsonLD = true

    ## Typography settings
    [params.typeface]
        ## Use web safe fonts (will overide font selection below)
        webSafe = false
        ## Serif font selection
        roman = 'crimson'
        ## Sans-serif font selection
        sans = 'inter'

```

### Preview Changes

1. Change to your site directory

```sh
cd mysite
```


2. To preview your changes locally before pushing to the repository, run Hugo's development server with the following command, make sure to update the baseURL to match your local IP address - this will make your site accessible across your local network:

```sh
hugo serve --minify --port=8080 --bind=0.0.0.0 --baseURL=http://192.168.0.1
```

3. With Hugo running, you can now configure your site and begin writing articles

### Updating Theme

To update the theme to the latest changes, run the following commands:

1. Change to your site directory

```sh
cd mysite
```

2. Update the theme submodule

```sh
git submodule update --remote --merge themes/hugo-brewm
```

3. Commit the changes

```sh
git add themes/hugo-brewm
git commit -m "Update hugo-brewm theme"
```

### Customizing Templates

To customize the theme's templates, create files with matching names in your site's root directory. These will override the default theme templates.

```
 mysite/
    ├── ...
    ├── assets/
    │   └── css/
    │       └── custom.css # This will replace theme's custom.css template
    ├── content/
    ├── layouts/
    │   ├── shortcodes/
    │   │   └── myshortcode.html # This will add {{< myshortcode >}} shortcodes
    │   ├── partials/
    │   │   └── header.html # This will replace theme's header.html template
    │   └── 404.html # This will replace theme's 404.html template
    ├── ...
    ├── static/
    └── themes/
        └── hugo-brewm/ # The remote theme
            ├── ...
            ├── assets/
            │   └── css/
            │       └── custom.css
            ├── layouts/
            │   ├── partials/
            │   │   └── header.html
            │   └── 404.html
            ├── static/
            └── ...
```

### Deploy on GitHub Pages

To deploy your Hugo site with PageFind on GitHub Pages, copy the workflow file from [./themes/hugo-brewm/github/workflows/hugo.yml](https://github.com/foxihd/hugo-brewm/blob/main/.github/workflows/hugo.yml) to your repository's workflow directory and start the GitHub Action.

### Deploy on Gitlab Pages

To deploy your Hugo site with PageFind on Gitlab Pages, copy the workflow file from [./themes/hugo-brewm/.gitlab-ci.yml](https://github.com/foxihd/hugo-brewm/blob/main/.gitlab-ci.yml) to your repository's workflow directory and start the Gitlab CI/CD pipeline.


## Support

> Most of us love coffee, aren't we?

For what it's worth.
This theme was originally made for my tiny coffee business that I work on myself.
But things have to shifted in last two years, as coffee prices hikes due to shortages induced by climate change.
I open my github sponsor if you'd love to help me.
I would appreciate it too if you saved your morning brew by supporting your local coffee shop.
That's maybe one of the small ethical revolutions we can do everyday if addressing our planet's issues can't be done in couple of earth's revolutions.
I hope this will help you recognise.

Keep brewing! :)

## Special Thanks

This project could not be made, without a lot efforts of — thank to:

- [Aliftype/Amiri](https://github.com/aliftype/amiri) - for Amiri.
- [Alvarotrigo on Codepen](https://codepen.io/alvarotrigo/pen/rNbxNWg) - for Logotype.
- [Antijingoist/opendyslexic/](https://github.com/antijingoist/opendyslexic/) - for OpenDyslexic typeface.
- [Datalog/Qrcode Svg](https://github.com/datalog/qrcode-svg) - for page QR code generation.
- [Dpecos/Mastodon Comments](https://github.com/dpecos/mastodon-comments) - for Mastodon comments.
- [Georgd/EB-Garamond](https://github.com/georgd/EB-Garamond), [Imedadel/Typeface EB Garamond/](https://github.com/imedadel/typeface-eb-garamond-latest/) & [Googlefonts/Ebgaramond Specimen/](https://github.com/googlefonts/ebgaramond-specimen/) - for serif typeface.
- [GoogleFonts/Inconsolata](https://github.com/googlefonts/Inconsolata) - for teletype typeface.
- [IcoMoon](https://icomoon.io) - for icon font.
- [JulietaUla/Montserrat](https://github.com/JulietaUla/Montserrat) - for sans-serif typeface.
- [Markmead/JS Bionic Reading](https://github.com/markmead/js-bionic-reading) - for BionRead support.
- [Mrozilla on codepen](https://codepen.io/mrozilla/pen/OJJNjRb) - for dark/light mode toggle style.
- [Msurguy/Flow Lines](https://github.com/msurguy/flow-lines) - for generated feature images.
- [Nsideras/Bluesky JS Comments](https://github.com/nsideras/bluesky-js-comments) - for Bluesky comments.
- [Omnibus-Type/Rosario](https://github.com/Omnibus-Type/Rosario) - for sans-serif typeface.
- [Risilab/Cormorant](https://github.com/risilab/cormorant) - for serif typeface.
- [Rsms/Inter](https://github.com/rsms/inter) - for sans-serif typeface.
- [Skoch/Crimson](https://github.com/skosch/Crimson) - for serif typeface.
- [Slashformotion/Hugo Tufte](https://github.com/slashformotion/hugo-tufte) - for figure, marginpar, epigraph and section shortcodes.

## License

This theme is released under the MIT License.
