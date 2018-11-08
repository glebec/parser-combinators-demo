'use strict';

const P = require('./parser')

/**
 * Examples live-coded during the presentation
 */

const zero = P.literal('0')
const one = P.literal('1')
const two = P.literal('2')

const zeroThroughTwo = zero.or(one).or(two)
console.log(zeroThroughTwo.parse('123')) // '1'

const digit = P.any(...'0123456789'.split('').map(P.literal))
console.log(digit.parse('9437523')) // '9'

// moving on to palindromes and MONADS

const letter = P.any(
    ...'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(P.literal)
)

// a palindrome is EITHER…
const palindrome = P.any(
    // a sequence of [LETTER -> PALINDROME -> LETTER]
    letter.chain(l => // bind the first letter in a variable
    palindrome.chain(p => // recursively parse an inner palindrome
    P.literal(l).chain(_ => // parse the same letter (don't need to re-bind it)
    P.of(l + p + l)))) // create a parser hard-coded to succeed with the str
    ,
    // or, a single LETTER
    letter
)

console.log(palindrome.parse('amanaplanacanalpanama')) // amanaplanacanalpanama
console.log(palindrome.parse('racecar!')) // racecar
console.log(palindrome.parse('raring to go!')) // rar
console.log(palindrome.parse('rawr')) // r
console.log(palindrome.parse('1racecar1')) // null
