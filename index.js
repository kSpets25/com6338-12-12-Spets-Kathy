const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  guessLetter(letter) {
    console.log(this.word)
    console.log(letter)
    this.letter = letter
    if (this.word.includes(letter)) {
  
      for (let i= 0; i < this.word.length; i++) {
        if(this.word[i] === letter) {
        this.displayWord = this.displayWord.substring(0,i) + letter + this.displayWord.substring(i+1, this.displayWord.length) 
        }
      }
      this.correctLetters.push(letter);
     
    } else { 
     
      this.incorrectLetters.push(letter)
      this.remainingGuesses -=1    
    }
  }
  
  updateScreen() {
    document.getElementById("remaining-guesses").textContent = this.remainingGuesses
    document.getElementById("incorrect-letters").textContent = this.incorrectLetters
    document.getElementById("word-to-guess").textContent = this.displayWord
  }

  isGameOver() {
    if (this.remainingGuesses <= 0 || this.displayWord == this.word) {
      return true
    } else {
      return false
    } 
  }

   getWinOrLoss() {
      if (this.remainingGuesses > 0 && this.displayWord === this.word) {
      return 'win'
    } else if (this.remainingGuesses <= 0 && this.displayWord !== this.word) {
        return 'loss' 
    } else {
      return null
    }
  }
}
function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}
document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()