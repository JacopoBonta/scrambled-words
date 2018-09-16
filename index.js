const fs = require('fs')
const sha256 = require('sha256')

const scrambled_words = fs.readFileSync('./scrambled-words.txt', 'UTF-8').split('\n')
const dictionary = fs.readFileSync('./dictionary.txt', 'UTF-8').split('\n')

console.log(`Dictionary length: ${dictionary.length}`)
console.log(`Scrambled words: ${scrambled_words.length}`)

// given a string as input return a map object with the frequency of each character
function count_chars(word) {
    const instances = new Map()
    let i = word.length
    while(i--) {
        let char = word.charAt(i)
        if (instances.has(char)) {
            const prev = instances.get(char)
            instances.set(char, prev + 1)
        } else {
            instances.set(char, 1)
        }
    }
    return instances
}

// check if two map objects are the same
function same_map(map1, map2) {
    if (map1.size !== map2.size) return false
    let same = true
    map1.forEach((value, key) => {
        if (map2.get(key) !== value) {
            same = false
        }
    })
    return same
}

let unscramble_words = []
scrambled_words.forEach(scramble => {
    const letters = count_chars(scramble)
    dictionary.forEach((entry, index) => {
        if (same_map(letters, count_chars(entry)))
            unscramble_words.push(entry)
    })
})

console.log(`Unscrambled words: ${unscramble_words.length}`)
console.log(`Flag content: ${sha256(unscramble_words.join(''))}`)