---
author : ['Author Name']
title: "Markdown Test"
description: "Various sample Markdown, HTML and MathML test"
date: 2025-01-26
type: post
draft: false
translationKey: markdown
coffee: 1
tags: ['markdown']
categories: ['Latex']
comments: false
secnum: true
---

<span class="letterine"><i>T</i>his is example of span with letterine class.</span>
You need set the `markup.goldmark.unsafe` and `markup.goldmark.renderer.unsafe` parameter in `config.toml` to write html directly, but this is not recommended.
{{< marginpar >}}
And this is marginpar.
**Bold text**,
*Italic text*,
***Bold and italic text***,
~~Strikethrough text~~, and
[Link](https://example.com)
---also works.
{{< /marginpar >}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{{<theorem "Lemma">}}This is theorem environment---will have counter.{{</theorem>}}

{{<marginpar "safeHTML">}}
<math display="block">
  <semantics>
    <mrow><mstyle scriptlevel="0" displaystyle="true"><mo>∮</mo><mover accent="true"><mrow><mi>F</mi></mrow><mo>⃗</mo></mover><mo>⋅</mo><mi>d</mi><mover accent="true"><mrow><mi>s</mi></mrow><mo>⃗</mo></mover><mo>=</mo><mn>0</mn></mstyle></mrow>
    <annotation encoding="application/x-tex">\displaystyle \oint \vec{F} \cdot d\vec{s}=0</annotation>
  </semantics>
</math>
<p>Please note that while the marginpar support MathML, the display and counter may not works as intended. Please use KaTeX or MathJax instead.</p>
{{</marginpar>}}

This page do not load with KaTeX nor MathJax script,
While all equations on this page is native MathML, the browser supports may vary.

<math class=textwidth display=block>
  <semantics>
    <mrow><mstyle scriptlevel="0" displaystyle="true"><mfrac><mrow><mn>1</mn></mrow><mrow><mo fence="true">(</mo><msqrt><mrow><mi>ϕ</mi><msqrt><mrow><mn>5</mn></mrow></msqrt></mrow></msqrt><mo>−</mo><mi>ϕ</mi><mo fence="true">)</mo><msup><mi>e</mi><mrow><mfrac><mn>2</mn><mn>5</mn></mfrac><mi>π</mi></mrow></msup></mrow></mfrac><mstyle><mspace width="0.1em"></mspace><mpadded width="0px"><mrow><mrow></mrow></mrow></mpadded><mpadded width="0px"><mrow><mrow></mrow></mrow></mpadded><mpadded width="0px"><mrow><mrow></mrow></mrow></mpadded><mspace width="1.5em"></mspace></mstyle><mn>1</mn><mo>+</mo><mfrac><mrow><msup><mi>e</mi><mrow><mo>−</mo><mn>2</mn><mi>π</mi></mrow></msup></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><msup><mi>e</mi><mrow><mo>−</mo><mn>4</mn><mi>π</mi></mrow></msup></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><msup><mi>e</mi><mrow><mo>−</mo><mn>6</mn><mi>π</mi></mrow></msup></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><msup><mi>e</mi><mrow><mo>−</mo><mn>8</mn><mi>π</mi></mrow></msup></mrow><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></mfrac></mstyle></mrow>
    <annotation encoding="application/x-tex">\displaystyle \frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} \equiv 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }</annotation>
  </semantics>
</math>

## Heading 2

First paragraph will not indent.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Second paragraph and after will indent.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> This is a blockquote
>> Nested blockquote

### Heading 3

{{<marginpar "abs">}}
<p>Example table on <kbd>marginpar</kbd> shortcode with <mark>"abs"</mark> attribute to support flowing content:</p>

<table style="text-align:center">
  <thead>
    <tr><th colspan=2>Number</th><th>Alphabeth</th>
  </tr>
  </thead>
  <tbody>
    <tr><td>16</td><td>14</td><td>A</td></tr>
    <tr><td>10</td><td>16</td><td>B</td></tr>
    <tr><td>14</td><td>10</td><td>C</td></tr>
  </tbody>
</table>
{{</marginpar>}}

1. Ordered list item 1
2. Ordered list item 2
   - Nested unordered item
   - Another nested item
3. Ordered list item 3

- Unordered list item
- Another item
  - Nested item
  - Another nested item

#### Heading 4

![Image alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Domestic_cat_sitting_by_door.jpg/640px-Domestic_cat_sitting_by_door.jpg)

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

Task list:
- [x] Completed task
- [ ] Incomplete task

##### Heading 5

Here's some `inline code` and some ***combined*** formatting.

Here's some block code:

    // code block with four space
    def hello_world():
        print("Hello, World!")

```js
// Code block with syntax highlighting
function greeting(name) {
    return `Hello, ${name}!`;
}
```

###### Heading 6

Heading level 6 will show as inline paragraph.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{{<theorem "Lemma">}}Another theorem shortcode with lorem ipsum dolor sit amet.{{</theorem>}}

<math class=textwidth display=block>
  <semantics>
    <mrow><mstyle scriptlevel="0" displaystyle="true"><mi>f</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mrow><mo fence="true">{</mo><mtable><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mfrac><mrow><mi>n</mi></mrow><mrow><mn>2</mn></mrow></mfrac><mo separator="true">,</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mtext>if&nbsp;</mtext><mi>n</mi><mtext>&nbsp;is&nbsp;even</mtext></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mn>3</mn><mi>n</mi><mo>+</mo><mn>1</mn><mo separator="true">,</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mtext>if&nbsp;</mtext><mi>n</mi><mtext>&nbsp;is&nbsp;odd</mtext></mrow></mstyle></mtd></mtr></mtable></mrow></mstyle></mrow>
    <annotation encoding="application/x-tex">\displaystyle f(n) = \begin{cases} \frac{n}{2}, &amp; \text{if } n\text{ is even} \\ 3n+1, &amp; \text{if } n\text{ is odd} \end{cases}</annotation>
  </semantics>
</math>