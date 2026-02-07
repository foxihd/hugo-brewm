+++
author = "AUTHOR NAME"
date = "2026-02-06T13:56:01-08:00"
type = "post"
meta = true
math = true
title = "Hugo-Tufte Features compatibility"
subtitle = "Fancy Subtitle"
toc = true
categories = ["latex"]
+++

This is a quick demonstration post.  It serves as an example of the features
of this theme.  One of them is $ \LaTeX $ via [Katex](https://katex.org/).
{{< section "begin" >}}
## A Bit About Mathematics

{{< epigraph pre="Shawn O'Hare, " cite="Math is Fun" post=", p.8"  >}}
This is an example of an epigraph with some math
$ \mathbb N \subseteq \mathbb R $
to start the beginning of a section.
{{< /epigraph >}}

<!--more-->

### Inline
Some inline math:
{{< marginpar >}}This is Marginpar.{{< /marginpar >}}
$e^{i \pi} = -1$
 and $\sqrt{-1} = i $
and $ a_2 = 3 $.

### Display
And display math using this symbol `$$`:
{{< marginnote >}}This is Marginnote with counter like footnote.{{< /marginnote >}}
$$
  -- \cdot_H -- \colon B(G,H) \times B(H, K) \to B(G, K), \quad ([X], [Y]) \mapsto [X \times_H Y].
$$

### Environments

Currently, certain $\LaTeX$ environments need to be escaped so that
the markdown processor does not override Katex.  Currently, display
environments should be enclosed in `<p>` tags and blank lines.
For instance:

<p>
$$
\begin{aligned}
  \mu(A) &= \iint_{I^2} \chi_A (x,y) \ d(x,y)
  = \int_I \left( \int_I  \chi_A (x,y) \ dx\right) dy
  = \int_I 0 \ dy= 0 \quad \text{and} \\
  \mu(A) &=\iint_{I^2}  \chi_A (x,y) \ d(x,y)
  = \int_I \left(  \int_I \chi_A (x,y) \ dy \right) dx
  =\int_I dx = 1,
\end{aligned}
$$
</p>
<!-- See https://github.com/jgm/pandoc/issues/3953#issuecomment-334670625 -->

is produced from

```txt
<p>
$$
\begin{aligned}
  \mu(A) &= \iint_{I^2} \chi_A (x,y) \ d(x,y)
  = \int_I \left( \int_I  \chi_A (x,y) \ dx\right) dy
  = \int_I 0 \ dy= 0 \quad \text{and} \\
  \mu(A) &=\iint_{I^2}  \chi_A (x,y) \ d(x,y)
  = \int_I \left(  \int_I \chi_A (x,y) \ dy \right) dx
  =\int_I dx = 1,
\end{aligned}
$$
</p>
```

### Blockquotes shortcode also eliminated

This is suppose to be `{{</* blockquotes */>}}`, instead we use `{{</* epigraph */>}}` shortcode. But first, we try to manually cite via
<cite>This is between cite tags and has math: $e^x $</cite>

{{< epigraph pre="Shawn O'Hare, " cite="www.shawnohare.com" link="https://www.shawnohare.com" >}}
This is a blockquote with two paragraphs, that employs the
theme's `blockquote` shortcode. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
{{< /epigraph >}}

### Code
As an example of some inline code: `go test -v -short`.
And this is some block-code:
```go {linenos=table,hl_lines=["2-5"],linenostart=199}
package main

import "log"

func add(x int, y int) int {
  log.Println("We are going to take the sum of two numbers, and leave a long comment.")
  return x + y
}

func main() {
  y := add(1, 2)
  log.Println(y)
}
```

Here's an example without line numbers.
```go {hl_lines=["2-5"],linenostart=199}
package main

import "log"

func add(x int, y int) int {
  log.Println("We are going to take the sum of two numbers, and leave a very very very long comment.")
  return x + y
}

func main() {
  y := add(1, 2)
  log.Println(y)
}
```

### Figure
Below we have an example of a regular width figure.
{{< figure
  src="https://github.com/edwardtufte/tufte-css/raw/gh-pages/img/exports-imports.png"
  class="class param"
  title="The image title."
  caption="This is the image caption."
  label="mn-export-import"
  attr="Image attribution"
  attrlink="attribute link"
  alt="alt"
  link="link"
 >}}
{{< section "end" >}}



{{< figure
  src="https://edwardtufte.github.io/tufte-css/img/rhino.png"
  class="class param"
  type="margin"
  label="mn-rhino"
  title="The image title."
  label="mn-export-import"
  caption="This is the image caption."
  attr="Image attribution"
  attrlink="https://edwardtufte.github.io/tufte-css"
  alt="alt"
  link="link"
 >}}
 But tight integration of graphics with text is central to Tufte’s work even when those graphics are ancillary to the main body of a text. In many of those cases, a margin figure may be most appropriate.
{{< section "end" >}}

Below is a full-width figure.
{{< figure
  src="https://edwardtufte.github.io/tufte-css/img/napoleons-march.png"
  type="full"
  label="mn-napoleonic-wars"
  title="Napoleonic wars"
  caption="This the image caption."
  attr="Image attribution"
  attrlink="attribute link"
  alt="Napoleonic wars"
  link="link"
 >}}
{{< section "end" >}}

## A Story About Cats
Climb a tree, wait for a fireman jump to fireman then scratch his face sleep on dog bed, force dog to sleep on floor cat snacks, and eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap climb a tree, wait for a fireman jump to fireman then scratch his face put toy mouse in food bowl run out of litter box at full speed . See owner, run in terror chase mice, so thinking longingly about tuna brine for eat a plant, kill a hand for wake up human for food at 4am. Human is washing you why halp oh the horror flee scratch hiss bite scratch the furniture and rub face on owner. Loves cheeseburgers see owner, run in terror chew on cable. Thug cat ignore the squirrels, you'll never catch them anyway. Eat a plant, kill a hand find empty spot in cupboard and sleep all day so hide head under blanket so no one can see yet love to play with owner's hair tie rub face on everything i like big cats and i can not lie. Wake up human for food at 4am stare at the wall, play with food and get confused by dust yet then cats take over the world scamper. Inspect anything brought into the house get video posted to internet for chasing red dot. Brown cats with pink ears chew foot spit up on light gray carpet instead of adjacent linoleum. I am the best wake up human for food at 4am, meow spread kitty litter all over house, for meow. Knock dish off table head butt cant eat out of my own dish jump off balcony, onto stranger's head, chase ball of string scream at teh bath but climb leg, so unwrap toilet paper but destroy couch. Climb a tree, wait for a fireman jump to fireman then scratch his face. Leave hair everywhere swat turds around the house eat grass, throw it back up, and eat grass, throw it back up. Chase after silly colored fish toys around the house.

### We really like cats.

Yes, they are fluffy and happy.
