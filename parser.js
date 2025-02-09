'use strict';

/**
 * Minimal demo of parser combinators, possibly as a target for recent
 * JS web dev graduates to implement as an exercise.
 *
 * Huge credit to Hutton, Meijer, and Swierstra for their papers
 * on the subject.
 */

module.exports = class Parser {

    // :: (String -> { result: a, remaining: String } | Null) -> Parser a
    constructor (parser) {
        this._parser = parser
    }

    // :: Parser a ~> String -> { result: a, remaining: String } | Null
    parse (string) {
        return this._parser(string)
    }

    // :: String -> Parser String
    static literal (string) {
        return new Parser(tokens => {
            if (!tokens.startsWith(string)) return null
            return {
                result: string,
                remaining: tokens.slice(string.length),
            }
        })
    }

    // :: Parser a ~> Parser b -> Parser (a | b)
    or (p2) {
        return new Parser(tokens => this.parse(tokens) || p2.parse(tokens))
    }

    // :: ...Parser * -> Parser *
    static any (...ps) {
        return ps.reduce((anyP, p) => anyP.or(p))
    }

    // :: (* -> Parser a) -> Parser a
    static lazy (mkParser) {
        return new Parser(tokens => mkParser().parse(tokens))
    }

    // OK here comes the monad stuff…

    // :: a -> Parser a
    static of (value) { // aka unit, pure, return, inject
        return new Parser(string => ({
            result: value,
            remaining: string,
        }))
    }

    // :: Parser a ~> (a -> Parser b) -> Parser b
    chain (step) { // aka bind, then, flatMap
        return new Parser(tokens => {
            const res1 = this.parse(tokens)
            if (!res1) return null
            const p2 = step(res1.result)
            return p2.parse(res1.remaining)
        })
    }

    // :: Parser a ~> (a -> b) -> Parser b
    map (f) {
        return this.chain(x => Parser.of(f(x)))
    }

    // :: Parser a -> Parser [a]
    static many0 (p1) {
        return p1.chain(r => {
            return Parser.many0(p1).chain(rs => {
                return Parser.of([r, ...rs])
            })
        }).or(Parser.of([]))
    }

    // :: Parser a -> Parser [a]
    static many1 (p1) {
        return p1.chain(r => {
            return Parser.many0(p1).chain(rs => {
                return Parser.of([r, ...rs])
            })
        })
    }

    // :: Parser a ~> Parser b -> Parser b
    useRight (p2) {
        return this.chain(() => p2)
    }

    // :: Parser a ~> Parser b -> Parser a
    useLeft (p2) {
        return this.chain(left => p2.chain(() => Parser.of(left)))
    }
}
