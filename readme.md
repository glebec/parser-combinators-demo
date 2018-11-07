# A Wild Presentation Appears!

A few hours ago I was asked if I could fill in for a speaker who couldn't make it to an event. I said yes, then pondered what I would actually talk about for a bit. Some topics I considered:

- [Tasks / Futures][futr]: like promises but better (lazy, cancellable, lawful functors/monads, etc.)
- [Sum types][sumt]: expressive and safe domain modeling
- [Folktale][folk], [Sanctuary][snct]: FP-in-JS helper libraries (include tasks & sum types)
- [Recursion schemes][recs]: what array methods are to for loops, recursion schemes are to manual recursion

[futr]: https://github.com/fluture-js/Fluture
[sumt]: https://medium.com/fullstack-academy/better-js-cases-with-sum-types-92876e48fd9f
[folk]: https://folktale.origamitower.com/
[snct]: https://sanctuary.js.org/
[recs]: https://blog.sumtypeofway.com/an-introduction-to-recursion-schemes/

## Parsers, I Choose You!

In the end I decided that I would go for _monadic parser combinators_ in the interest of time. That's because:

- I like them
- They embody a lot of nice FP characteristics (purity, composition, monads)
- I just finished [Part 1][pars] of an interactive tutorial / article on them
- They are relatively easy to demo live without prep

[pars]: https://dev.to/glebec/monadic-parser-combinators-an-interactive-js-tutorial-pt-1-3jbo

## The Repo

This repo contains:

- [The parser library class implementation](parser.js)
- [Example programs using the parser library](examples.js)
- [Sample grammars to work off of](docs)

…plus any notes or ephemera that I may make while live coding.
