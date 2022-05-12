const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

track.connect(gainNode).connect(panner).connect(audioContext.destination);

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

const volumeControl = document.querySelector("#volume");
volumeControl.addEventListener(
  "input",
  function () {
    gainNode.gain.value = this.value;
  },
  false
);

const pannerControl = document.querySelector("#panner");
pannerControl.addEventListener(
  "input",
  function () {
    panner.pan.value = this.value;
  },
  false
);

pannerControl.addEventListener("dblclick", function () {
  this.value = 0;
  panner.pan.value = 0;
});
