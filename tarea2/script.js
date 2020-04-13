// Variables
let nPlayers = 2;
const NPLAYERSMIN = 2;
const NPLAYERSMAX = 4;
const WINNERKEYUPS = 100;
// playersKeys = {"0": [q, w], "1": [a, s]}
const playersKeys = {};
// playersInputs = {"0": [inputHTML1, inputHTML2], "1": [inputHTML1, inputHTML2]}
const playersInputs = {};
// scores = {"0": score1, "1": score2}
const scores = {};
// playersStatus = [true, true]
const playersStatus = [];
const timers = [];
let blockingTime = false;

// DOM Elements
const gameDiv = document.getElementById("game");
const keysDiv = document.getElementById("keys");
const setKeysDiv = document.getElementById("setKeys");
const nPlayersSpan = document.getElementById("nPlayers");
const setPlayersDiv = document.getElementById("setPlayers");

// Query Selectors
const numBtn = document.querySelectorAll('#decrease, #increase');
const sendPlayersBtn = document.querySelector('#sendPlayers');
const sendKeysBtn = document.querySelector('#sendKeys');

// Functions
const keyHandler = (event) => {
  const key = event.key;
  Object.values(playersKeys).forEach((playerKeys, index) => {
    if (playerKeys[0] === key && playersStatus[index]) scores[index]++;
    else if (playerKeys[0] === key && !playersStatus[index]) scores[index]--;
    else if (playerKeys[1] === key && playersStatus[index] && !blockingTime) scores[index]--;
    else if (playerKeys[1] === key && playersStatus[index] && blockingTime) blockParticipants(index);
  });
  return scores;
}

const printWinner = (scores) => {
  statusH.innerHTML = `PLAYER ${
  Object.values(scores).reduce((iMax, x, i, arr) =>
    x > arr[iMax] ? i : iMax, 0) + 1} WINS!`;
}

const print = (val) => {
  let element = document.createElement('p')
  element.innerText = val
  document.body.appendChild(element)
}

const addKeyBlock = (miliSeconds) => {
  const block = Rx.Observable.timer(miliSeconds);
  timers.push(block
          .finally()
          .subscribe(() => {statusH.innerText = 'Tell a joke (key N°2)!',
                            blockingTime = true}))
};

const addBlockTimer = (miliSeconds) => {
  const blockTimer = Rx.Observable.timer(miliSeconds)
  timers.push(blockTimer
          .finally()
          .subscribe(() => unblockParticipants()));
};

const blockParticipants = (i) => {
  playersStatus.forEach((status, index) => {
    if (index != i) playersStatus[index] = false;
  });
  blockingTime = false;
  statusH.innerText = `Player ${i + 1} tells a joke! *Everyone laughs*`;
  addBlockTimer(Math.floor((Math.random() * 5000) + 2));
};

const unblockParticipants = (i) => {
  playersStatus.forEach((status, index) => playersStatus[index] = true);
  statusH.innerText = 'Chug (key N°1)!';
  addKeyBlock(Math.floor((Math.random() * 5000) + 2));
};

// Observables
const numBtnObs = Rx.Observable.fromEvent(numBtn, 'click');
const sendPlayersObs = Rx.Observable.fromEvent(sendPlayersBtn, 'click');
const sendKeysObs = Rx.Observable.fromEvent(sendKeysBtn, 'click');
const startTimer = Rx.Observable.create(observer => {
  let value = 2;
  setInterval(() => {
    if (value === 0) observer.complete();
    else observer.next(value);
    value--;
  }, 1000);
});
const keysObs = Rx.Observable.fromEvent(document, "keyup").map(keyHandler);
const scoresBehaviouralSubject = new Rx.BehaviorSubject(scores);

// Observadores
const numObserver = numBtnObs.subscribe(event => {
  const targetId = event.currentTarget.id;
  if (targetId === "increase" && nPlayers < NPLAYERSMAX) {
    nPlayersSpan.innerHTML = `N° of Players (2 - 4): ${++nPlayers}`
  } else if (targetId === "decrease" && nPlayers > NPLAYERSMIN) {  //decrease
    nPlayersSpan.innerHTML = `N° of Players (2 - 4): ${--nPlayers}`
  }
});

const sendPlayersObserver = sendPlayersObs.subscribe(() => {
  numObserver.unsubscribe();
  setPlayers.style.display = "none";
  keysDiv.style.display = "block";
  Array(nPlayers).fill().forEach((e, index) => {
    const divWrapper = document.createElement('div');
    const playerSpan = document.createElement("span");
    playerSpan.innerHTML = `Player ${index + 1}:`;
    divWrapper.appendChild(playerSpan);
    const inputs = [document.createElement("input"), document.createElement("input")]
    inputs.forEach((input, index) => {
      input.setAttribute("type", "text");
      input.setAttribute("maxLength", "1");
      input.style.margin = "10px";
      input.placeholder = `Key N°${index + 1}`;
      input.style.display = "inline-block";
      divWrapper.appendChild(input);
    });
    scores[index] = 0;
    playersStatus[index] = true;
    playersInputs[index] = inputs;
    setKeysDiv.appendChild(divWrapper);
  });
});

const sendKeysObserver = sendKeysObs.subscribe(() => {
  const keys = new Set();
  Object.values(playersInputs).forEach(playerInputs => {
    playerInputs.map(input => input.value)
                .filter(val => val !== "")
                .forEach(val => keys.add(val));
  });
  if (keys.size !== nPlayers  * 2) alert("Empty or repeated keys submited!\nTry Again.");
  else {
    Object.values(playersInputs).forEach((playerInputs, index) => {
      playersKeys[index] = playerInputs.map(input => input.value);
    });
    sendKeysObserver.unsubscribe();
    keysDiv.style.display = "none";
    gameDiv.style.display = "block";
    startTimer.subscribe(startTimerObserver);
  };
})

const startTimerObserver = {
  next: value => statusH.innerHTML = `${value}`,
  error: err => console.error(err),
  complete: () => {
    statusH.innerHTML = "Chug (key N°1)!";
    const kObs = keysObs.subscribe(keysObserver);
    scoresBehaviouralSubject
      .takeWhile(scores => Object.values(scores).every(x => x < WINNERKEYUPS))
      .finally(() => {kObs.unsubscribe(),
                      printWinner(scores),
                      timers[timers.length - 1].unsubscribe()})
      .subscribe();
    addKeyBlock(Math.floor((Math.random() * 5000) + 2));
  }
};

const keysObserver = {
  next: scores => {
    playerScores.innerHTML = "";
    Object.values(scores).forEach((score, player) => {
      playerScores.innerHTML += `P${player + 1}: ${score} `;
    });
    scoresBehaviouralSubject.next(scores);
  },
  error: err => console.log(err),
  complete: () => console.log(`Got a winner`)
}
