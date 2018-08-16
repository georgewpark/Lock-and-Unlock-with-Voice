//DOM load event
window.addEventListener("DOMContentLoaded", () => {

    //Set speech recognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition(),
          padlock = document.querySelector('.padlock'),
          openSound = document.querySelector('.padlock-open'),
          closeSound = document.querySelector('.padlock-close'),
          heardOutput = document.querySelector('.heard-output'),
          openPadlock = () => {
              padlock.classList.add('unlock');
              openSound.play();
          },
          closePadlock = () => {
              padlock.classList.remove('unlock');
              closeSound.play();
          };

    //Start speech recognition
    recognition.start();

    //Listen for when the user finishes talking
    recognition.addEventListener('result', e => {

        //Get transcript of user speech
        const transcript = e.results[0][0].transcript.toLowerCase().replace(/\s/g, '');

        //Output transcript
        heardOutput.textContent = transcript;

        //Check if transcript is valid
        if (transcript === 'unlock' && !padlock.classList.contains('unlock')) {
            openPadlock();
        } else {
            if (transcript === 'lock' && padlock.classList.contains('unlock')) {
                closePadlock();
            }
        }
    });

    //Restart speech recognition after user has finished talking
    recognition.addEventListener('end', recognition.start);

    //Click padlock to open/close
    padlock.addEventListener('click', () => padlock.classList.contains('unlock') ? closePadlock() : openPadlock());

});
