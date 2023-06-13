const textArea = document.querySelector("textarea");
const speedInput = document.querySelector("#speed-input");
const clearButton = document.querySelector(".clear-btn");
const playButton = document.querySelector(".play-btn");
const pauseButton = document.querySelector(".pause-btn");
const stopButton = document.querySelector(".stop-btn");

//code
playButton.addEventListener("click", () => {
  pauseButton.classList.remove("hidden");
  stopButton.classList.remove("hidden");
  playAudio(textArea.value, speedInput.value);
});

pauseButton.addEventListener("click", pauseAudio);

stopButton.addEventListener("click", stopAudio);

clearButton.addEventListener("click", () => {
  textArea.value = "";
});

//functions
function playAudio(text, speed) {
  if (speechSynthesis.paused || speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }

  const currentSpeech = new SpeechSynthesisUtterance();
  currentSpeech.lang = "en-US";
  currentSpeech.text = text;
  currentSpeech.rate = parseFloat(speed);
  currentSpeech.addEventListener("end", () => {
    textArea.disabled = false;
  });
  textArea.disabled = true;

  speechSynthesis.speak(currentSpeech);
}

function pauseAudio() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
}

function stopAudio() {
  speechSynthesis.cancel();
  textArea.disabled = false;
  pauseButton.classList.add("hidden");
  stopButton.classList.add("hidden");
}
