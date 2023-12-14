let letters = 'abcdefghijklmnopqrstuvwxyz';
lettersArray = Array.from(letters);
let allLetters = document.querySelector('.letters');
let arrayOfElement, randomPropElement;
let wrongAttempts = 0;
let counter = 0;
let testArray = [];

createLetters();
function createLetters() {
  lettersArray.forEach((letter, index) => {
    let li = document.createElement('li');
    li.className = 'letter-box';
    li.innerHTML = letter;
    allLetters.appendChild(li);
  });
}

const words = {
  programming: ["php", "javascript", "go", "scala"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
let wordsValue = [];

Object.values(words).map((word) => {
  wordsValue.push(...word);
});

generateWords(words);

function generateWords (words) {
  if(wordsValue.length > 0) {
    //Get Keys Object
    let allKeys = Object.keys(words);
    // Random Number Depend On Keys Length
    let randomPropNum = Math.floor(Math.random() * allKeys.length);
    
    randomPropElement = wordsValue[Math.floor(Math.random() * wordsValue.length)];
    arrayOfElement = Array.from(randomPropElement.toLowerCase());

    document.querySelector('.category span').innerHTML = allKeys[randomPropNum];
  
    lettersGuess(randomPropElement);

    wordsValue = wordsValue.filter((element) => {
      return element != randomPropElement;
    });
  } else {
    swal("This Game Is End");
    setInterval(function() {
      window.location.reload();
    }, 5000);
  }
}

function lettersGuess(randomPropElement) {
  randomPropElement.split('').forEach((element) => {
    let li = document.createElement('li');
    li.className = 'split-letter';
    if(element === " ")  li.className = 'space';
    else li.innerHTML = "";
    document.querySelector('.letters-guess').append(li);
  });
}

checkLetters(randomPropElement);

function checkLetters(randomPropElement) {
  let hangmanDraw = document.querySelector('.hangman-draw');
  let guess = document.querySelectorAll('.letters-guess li');
  document.querySelectorAll('.letters li').forEach((element) => {
  
    element.onclick = () => {
      let theStatus = false;
      let theClickedLetters = element.innerHTML.toLowerCase();
      element.className = 'opacity-hidden';
  
      arrayOfElement.forEach((element, index) => {
        if(element == theClickedLetters) {
          guess[index].innerHTML = theClickedLetters;
          theStatus = true;
          document.querySelector('.successAudio').play();
          counter++;
          console.log(counter);
          if(counter == guess.length) {
            GameWin(randomPropElement);
            counter = 0;
          }
        }
      });

      if(theStatus !== true) {
        document.querySelector('.errorAudio').play();
        wrongAttempts++;
        hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
        if(wrongAttempts === 7) {
          allLetters.classList.add('finishGame');
          GameLoss();
        }
      }
    }
  });
}

function GameWin (randomPropElement) { 
  swal("Good job!", "", "success");
  document.addEventListener('click', (e) => {
    if(e.target.className === 'swal-button swal-button--confirm') {
      document.querySelectorAll('.letters li').forEach((ele) => {
        ele.remove();
      });
      document.querySelectorAll('.letters-guess li').forEach((ele) => {
        ele.remove();
      });
      createLetters();
      generateWords(words);
      checkLetters(randomPropElement);
    }
  });
}

function GameLoss() {
  swal("Game Over!", "", "error");
  document.addEventListener('click', (e) => {
    if(e.target.className === 'swal-button swal-button--confirm') {
      window.location.reload();
    }
  });
}
