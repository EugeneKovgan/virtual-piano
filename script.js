const COLLECTION = document.querySelectorAll(".piano-key");
const PIANO = document.querySelector(".piano");
const FULLSCREEN = document.querySelector(".fullscreen");
const BtnNotes = document.querySelector(".btn-notes");
const BtnLatter = document.querySelector(".btn-letters");

BtnNotes.addEventListener("click", function () {
  BtnLatter.classList.remove("btn-active");
  BtnNotes.classList.add("btn-active");
  COLLECTION.forEach((elem) => {
    elem.classList.remove("piano-key-letter");
  });
});

BtnLatter.addEventListener("click", function (event) {
  BtnNotes.classList.remove("btn-active");
  BtnLatter.classList.add("btn-active");
  COLLECTION.forEach((elem) => {
    elem.classList.add("piano-key-letter");
  });
});

FULLSCREEN.addEventListener("click", (event) => {
  fullScreenChenge();
});

const startSound = (event) => {
  event.target.classList.add(
    "active",
    "piano-key-active-pseudo",
    "piano-key-active"
  );
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
};

const stoptSound = (event) => {
  event.target.classList.remove(
    "active",
    "piano-key-active-pseudo",
    "piano-key-active"
  );
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add(
      "active",
      "piano-key-active-pseudo",
      "piano-key-active"
    );
    const note = event.target.dataset.note;
    console.log(note);
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }

  COLLECTION.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);

    elem.addEventListener("mouseout", stoptSound);
  });
};

const stoptCorrespondOver = () => {
  COLLECTION.forEach((elem) => {
    elem.classList.remove(
      "active",
      "piano-key-active-pseudo",
      "piano-key-active"
    );
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stoptSound);
  });
};

PIANO.addEventListener("mousedown", startCorrespondOver);
PIANO.addEventListener("mouseup", stoptCorrespondOver);

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function playPianoKeyboard(event) {
  for (let i = 0; i < COLLECTION.length; i++) {
    if (
      COLLECTION[i].dataset.letter === String.fromCharCode(event.keyCode) &&
      !event.repeat
    ) {
      const note = COLLECTION[i].dataset.note;
      const src = `assets/audio/${note}.mp3`;
      playAudio(src);
      COLLECTION[i].classList.add("active");
      COLLECTION[i].classList.add("piano-key-active");
      COLLECTION[i].classList.add("piano-key-active-pseudo");
    }

    window.addEventListener("keyup", (event) => {
      switch (String.fromCharCode(event.keyCode)) {
        case COLLECTION[i].dataset.letter:
          COLLECTION[i].classList.remove("active");
          COLLECTION[i].classList.remove("piano-key-active");
          COLLECTION[i].classList.remove("piano-key-active-pseudo");

          window.addEventListener("keydown", playPianoKeyboard);
          break;
      }
    });
  }
}
window.addEventListener("keydown", playPianoKeyboard);

function fullScreenChenge() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
