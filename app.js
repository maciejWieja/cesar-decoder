const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')
const textarea = document.querySelector('#textarea')
const parShift = document.querySelector('#cesarShift')
const divResult = document.querySelector('#result')

const alphabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż']
const sortedAlphabet = ['a', 'i', 'o', 'e', 'z', 'n', 'r', 'w', 's', 't', 'c', 'y', 'k', 'd', 'p', 'm', 'u', 'j', 'l', 'ł', 'b', 'g', 'ę', 'h', 'ą', 'ó', 'ż', 'ś', 'ć', 'f', 'ń', 'q', 'ź', 'v', 'x']
let attempt = 0

const decode = () => {
  const txt = textarea.value
  if (!txt) return
  const letters = txt.split('')
  const lettersNoSpace = letters.filter(e => e !== ' ')
  const countedLetters = []
  lettersNoSpace.forEach(letter => {
    letter = letter.toLowerCase()
    let isExist = false
    let indexOfExistingNum
    countedLetters.forEach((e, index) => {
      if (e.includes(letter)) {
        isExist = true
        indexOfExistingNum = index
      }
    })
    if (isExist) {
      countedLetters[indexOfExistingNum][1] = countedLetters[indexOfExistingNum][1] + 1
      return
    }
    countedLetters.push([letter, 1])
  })
  const countedLettersNoWhiteSign = countedLetters.filter(e => e[0].search(/\s/))
  countedLettersNoWhiteSign.sort((a, b) => a[1] - b[1])
  const mostOccuredLetter = countedLettersNoWhiteSign[countedLettersNoWhiteSign.length - 1][0]

  const indexOfMostOccuredLetter = alphabet.indexOf(mostOccuredLetter)
  const indexOfLetterShoultBeOccured = alphabet.indexOf(sortedAlphabet[attempt])
  let cesarShift = 0

  if (indexOfMostOccuredLetter > indexOfLetterShoultBeOccured) {
    cesarShift = indexOfMostOccuredLetter - indexOfLetterShoultBeOccured
  } else if (indexOfMostOccuredLetter < indexOfLetterShoultBeOccured) {
    cesarShift = indexOfMostOccuredLetter + alphabet.length - indexOfLetterShoultBeOccured
  }

  let decodedTxt = ''
  letters.forEach(e => {
    let isBig = false
    if (e.charCodeAt(0) > 64 && e.charCodeAt(0) < 91) {
      isBig = true
    }
    const letter = e.toLowerCase()
    let indexOfNewLetter
    if (cesarShift > alphabet.indexOf(letter)) {
      indexOfNewLetter = alphabet.indexOf(letter) - cesarShift
      indexOfNewLetter = alphabet.length - (indexOfNewLetter - (indexOfNewLetter * 2))
    } else {
      indexOfNewLetter = alphabet.indexOf(letter) - cesarShift
    }
    let newLetter
    if (alphabet.includes(letter)) {
      newLetter = alphabet[indexOfNewLetter]
    } else {
      newLetter = letter
    }
    if (!e.search(/\n/)) {
      newLetter = '<br>'
    } else if (!e.search(/\t/)) {
      newLetter = '&emsp;'
    }
    decodedTxt += isBig ? newLetter.toUpperCase() : newLetter
  })
  parShift.innerHTML = `cesar shift: ${cesarShift}`
  divResult.innerHTML = decodedTxt
  btn2.style.display = 'block'
}

textarea.focus()

btn1.addEventListener('click', () => {
  attempt = 0
  decode()
})
btn2.addEventListener('click', () => {
  if (attempt > 33) {
    btn2.style.display = 'none'
    return
  }
  attempt++
  decode()
})
