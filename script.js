const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const textBox = document.querySelector("#textarea");
const copyText = document.querySelector("#copyText");
const clearText = document.querySelector("#clearText");
const speakOut = document.querySelector("#speakOut");
const whatHappened = document.querySelector("#whatHappened");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("voice recognition activated");
  whatHappened.textContent = "Voice recognition activated";
};

recognition.onresult = function (event) {
  let current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  textBox.textContent += transcript;
  console.log("Text captured");
  whatHappened.textContent = "Text captured";
};

recognition.continuous = true;

btnStart.addEventListener("click", () => {
  recognition.start();
});

function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  speech.text = message;
  speech.voice = allVoices[100];
  speech.volume = 1;
  speech.rate = 0.87;
  speech.pitch = 0;
  window.speechSynthesis.speak(speech);
  console.log("Speaking out");
  whatHappened.textContent = "Speaking out";
}

btnStop.addEventListener("click", () => {
  recognition.stop();
  console.log("voice recognition deactivated");
  whatHappened.textContent = "Voice recognition deactivated & Text captured";
});

speakOut.addEventListener("click", () => {
  readOut(textBox.value);
});

clearText.addEventListener("click", () => {
  textBox.textContent = "";
  console.log("Text Cleared");
  whatHappened.textContent = "Text cleared";
});

copyText.addEventListener("click", () => {
  var a = textBox;
  a.select();
  a.setSelectionRange(0, 999999999);
  document.execCommand("copy");
  console.log("Text Copied");
  whatHappened.textContent = "Text copied";
});

const quickGuide = document.querySelector("#quickGuide");

let quickGuideText = `
<div class="guideText">
      <p>Quick Guide:</p>
      <p>
        This recording feature is available only in a few web browsers such as
        Chrome.
      </p>
      <p>
        1 - You can start your recording by clicking on the 'start recording'
        button.
      </p>
      <p>2 - To stop the recording click on the 'stop recording' button.</p>
      <p>
        3 - To copy all the text in the text box click on the 'copy text'
        button.
      </p>
      <p>4- To speak out all the text click on the 'speak out' button.</p>
      <p>5 - To clear all the text click on the 'clear text' button.</p>
      <p>Thank you!</p>
      <p>Click on the 'Quick Guide' text on the top to close it.</p>
    </div>
`;

let count = 0;

quickGuide.addEventListener("click", () => {
  count++;
  if (count % 2 !== 0) {
    document.querySelector("#quickGuideText").innerHTML = quickGuideText;
  } else {
    document.querySelector("#quickGuideText").innerHTML = "";
    count = 0;
  }
});
