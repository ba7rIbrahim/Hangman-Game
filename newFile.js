document.querySelectorAll(".letters li").forEach((element) => {
  element.onclick = () => {
    let theStatus = false;

    let theClickedLetters = element.innerHTML.toLowerCase();
    element.className = "opacity-hidden";

    arrayOfElement.forEach((element, index) => {
      if (element == theClickedLetters) {
        guess[index].innerHTML = theClickedLetters;
        theStatus = true;
        document.querySelector(".successAudio").play();
        counter++;
        console.log(guess.length);
        console.log(counter);
        // if(counter == )
      }
    });

    if (theStatus !== true) {
      document.querySelector(".errorAudio").play();
      wrongAttempts++;
      hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 7) {
        allLetters.classList.add("finishGame");
        endGame();
      }
    }
  };
});
