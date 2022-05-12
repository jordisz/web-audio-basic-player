const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);

const playButton = document.querySelector("button");
playButton.addEventListener(
  "click",
  function () {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    if (this.dataset.playing === "false") {
      audioElement.play();
      this.dataset.playing = "true";
    } else if (this.dataset.playing === "true") {
      audioElement.pause();
      this.dataset.playing = "false";
    }
  },
  false
);

audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false
);
