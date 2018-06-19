document.addEventListener("DOMContentLoaded", function() {
  const GAMES_URL = 'http://localhost:3000/api/v1/games'
  const USERS_URL = 'http://localhost:3000/api/v1/users'
  let capitalize
  let toCapitalize

  const keyCodes = {
  0: 'That key has no keycode',
  3: 'break',
  8: 'backspace / delete',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause/break',
  20: 'caps lock',
  21: 'hangul',
  25: 'hanja',
  27: 'escape',
  28: 'conversion',
  29: 'non-conversion',
  32: 'spacebar',
  33: 'page up',
  34: 'page down',
  35: 'end',
  36: 'home',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
  41: 'select',
  42: 'print',
  43: 'execute',
  44: 'Print Screen',
  45: 'insert',
  46: 'delete',
  47: 'help',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: 'semicolon (firefox), equals',
  60: '<',
  61: 'equals (firefox)',
  63: 'ß',
  64: '@ (firefox)',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'Windows Key / Left ⌘ / Chromebook Search key',
  92: 'right window key',
  93: 'Windows Menu / Right ⌘',
  95: 'sleep',
  96: 'numpad 0',
  97: 'numpad 1',
  98: 'numpad 2',
  99: 'numpad 3',
  100: 'numpad 4',
  101: 'numpad 5',
  102: 'numpad 6',
  103: 'numpad 7',
  104: 'numpad 8',
  105: 'numpad 9',
  106: 'multiply',
  107: 'add',
  108: 'numpad period (firefox)',
  109: 'subtract',
  110: 'decimal point',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  124: 'f13',
  125: 'f14',
  126: 'f15',
  127: 'f16',
  128: 'f17',
  129: 'f18',
  130: 'f19',
  131: 'f20',
  132: 'f21',
  133: 'f22',
  134: 'f23',
  135: 'f24',
  144: 'num lock',
  145: 'scroll lock',
  160: '^',
  161: '!',
  162: '؛ (arabic semicolon)',
  163: '#',
  164: '$',
  165: 'ù',
  166: 'page backward',
  167: 'page forward',
  168: 'refresh',
  169: 'closing paren (AZERTY)',
  170: '*',
  171: '~ + * key',
  172: 'home key',
  173: 'minus (firefox), mute/unmute',
  174: 'decrease volume level',
  175: 'increase volume level',
  176: 'next',
  177: 'previous',
  178: 'stop',
  179: 'play/pause',
  180: 'e-mail',
  181: 'mute/unmute (firefox)',
  182: 'decrease volume level (firefox)',
  183: 'increase volume level (firefox)',
  186: 'semi-colon / ñ',
  187: 'equal sign',
  188: ',',
  189: '-',
  190: '.',
  191: 'forward slash / ç',
  192: 'grave accent / ñ / æ / ö',
  193: '?, / or °',
  194: 'numpad period (chrome)',
  219: 'open bracket',
  220: 'back slash',
  221: 'close bracket / å',
  222: 'single quote / ø / ä',
  223: '`',
  224: 'left or right ⌘ key (firefox)',
  225: 'altgr',
  226: '< /git >, left back slash',
  230: 'GNOME Compose Key',
  231: 'ç',
  233: 'XF86Forward',
  234: 'XF86Back',
  235: 'non-conversion',
  240: 'alphanumeric',
  242: 'hiragana/katakana',
  243: 'half-width/full-width',
  244: 'kanji',
  255: 'toggle touchpad',
};

  const oneStepAtTheTime = [
    "A Waterloo Medal was designed by sculptor Benedetto Pistrucci. Commemorating the Battle of Waterloo (18 June 1815), the medal was commissioned by the British Government in 1819 on the instructions of George IV while Prince Regent; copies were to be presented to the victorious generals and to leaders of Britain's allies. The Prince Regent and William Wellesley-Pole, Master of the Mint, had been impressed by Pistrucci's models, and gave him the commission.",
    `Augusta Ada King-Noel, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognize that the machine had applications beyond pure calculation, and published the first algorithm intended to be carried out by such a machine. As a result, she is sometimes regarded as the first to recognize the full potential of a "computing machine" and the first computer programmer.`,
    `JavaScript, often abbreviated as JS, is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm. Alongside HTML and CSS, JavaScript is one of the three core technologies of the World Wide Web. JavaScript enables interactive web pages and thus is an essential part of web applications. The vast majority of websites use it, and all major web browsers have a dedicated JavaScript engine to execute it.`,
    `Matsumoto stresses that systems design needs to emphasize human, rather than computer, needs: Often people, especially computer engineers, focus on the machines. They think, "By doing this, the machine will run fast. By doing this, the machine will run more effectively. By doing this, the machine will something something something." They are focusing on machines. But in fact we need to focus on humans, on how humans care about doing programming or operating the application of the machines. We are the masters. They are the slaves.`,
    `A space elevator is a proposed type of planet-to-space transportation system.[1] The main component would be a cable (also called a tether) anchored to the surface and extending into space. The design would permit vehicles to travel along the cable from a planetary surface, such as the Earth's, directly into space or orbit, without the use of large rockets. An Earth-based space elevator would consist of a cable with one end attached to the surface near the equator and the other end in space beyond geostationary orbit (35,786 km altitude). The competing forces of gravity, which is stronger at the lower end, and the outward/upward centrifugal force, which is stronger at the upper end, would result in the cable being held up, under tension, and stationary over a single position on Earth. With the tether deployed, climbers could repeatedly climb the tether to space by mechanical means, releasing their cargo to orbit. Climbers could also descend the tether to return cargo to the surface from orbit.`,
    `Alan Mathison Turing was an English computer scientist, mathematician, logician, cryptanalyst, philosopher, and theoretical biologist. Turing was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer. Turing is widely considered to be the father of theoretical computer science and artificial intelligence.`,
    `Steven Paul Jobs (February 24, 1955 – October 5, 2011) was an American entrepreneur and business magnate. He was the chairman, chief executive officer (CEO), and a co-founder of Apple Inc., chairman and majority shareholder of Pixar, a member of The Walt Disney Company's board of directors following its acquisition of Pixar, and the founder, chairman, and CEO of NeXT. Jobs and Apple co-founder Steve Wozniak are widely recognized as pioneers of the microcomputer revolution of the 1970s and 1980s.`,
    `Mammals (class Mammalia) are vertebrate animals characterized by the presence of sweat glands, including milk producing sweat glands, and by the presence of: hair, three middle ear bones used in hearing, and a neocortex region in the brain. Mammals, other than the monotremes, give birth to live young instead of laying eggs. They also possess specialized teeth and use a placenta in the ontogeny. The mammalian brain regulates endothermic and circulatory systems, including a four-chambered heart. Mammals encompass approximately 5,400 species, ranging in size from the Bumblebee Bat, (30-40mm), to the Blue Whale, (33,000mm), distributed in about 1,200 genera, 153 families, and 29 orders, though this varies by classification scheme.`
  ]

  const container = document.getElementById("container");
  const leaderBoard = document.getElementById('leaderboard');

  let intervalFn;
  let counterKeystroke = 0;
  let correctStrokeCnt = 0;
  let wpm;

  let timerCount = 100;
  let flag = true;
  let user;
  let usersArray = [];

  function requestGames() {
    let h1 = document.createElement('H1')
    h1.innerText = "Leaderboard"

    leaderBoard.appendChild(h1)

    fetch(GAMES_URL).then(response=>response.json()).then(displayGames)
  }

  function displayGames(gameObjs) {
    let ol = document.createElement('OL')

    usersGetRequest().then(userObjs =>
      userObjs.forEach(function(userObj) {
        usersArray.push(userObj);
      })
    ).then(() => {
      let gamesArray = Array.from(gameObjs).sort(function(a,b) {
        return parseInt(b.wpm)*parseInt(b.accuracy)-parseInt(a.wpm)*parseInt(a.accuracy)
      })

      gamesArray.forEach(gameObj => {
        let userInstance = usersArray.find(user => user.id === gameObj.user_id)
        let li = document.createElement('LI')
        li.innerText = `${userInstance.name} | Accuracy: ${gameObj.accuracy} | WPM: ${gameObj.wpm} | Score: ${parseInt(gameObj.accuracy)*parseInt(gameObj.wpm)}`

        ol.appendChild(li)
      })
    })
    leaderBoard.appendChild(ol)
  }

  function getUserName() {
    container.innerHTML += `Please Enter Your Name: <input id="name-input-field" type="text">
    <button id="name-submit" type="submit">Submit</button>`
    let submitButton = document.getElementById('name-submit')
    submitButton.addEventListener('click', userPostRequest)
  }

  function usersGetRequest() {
    return fetch(USERS_URL).then(resp=>resp.json())
  }

  function userPostRequest(e) {
    // e.preventDefault()
    let nameInput = document.getElementById('name-input-field').value

    let config = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: nameInput})
    }
    fetch(USERS_URL, config).then(resp=>resp.json()).then(data => user = data).then(pageSetUp)
  }

  function pageSetUp() {
    container.innerHTML = ""
    leaderBoard.innerHTML = ""
    if (document.getElementById('clock')) {
      document.getElementById('clock').remove();
    }
    timerCount = 10;
    displayClock();
    displayText();
    requestGames();
  }

  function startClock() {
    intervalFn = setInterval(handleInterval, 1000);
    setTimeout(stopClock, 100000)
  }

  function handleInterval() {
    const clockDiv = document.getElementById("clock")
    clockDiv.innerText = --timerCount;
  }

  function disableInterval() {
    clearInterval(intervalFn);
  }

  function displayClock(){
    let clockDiv = document.createElement("div");
    clockDiv.id = "clock";
    clockDiv.style.backgroundColor = "black";
    clockDiv.style.margin = "auto";
    clockDiv.style.fontSize = '50px';
    clockDiv.style.color = 'white';

    clockDiv.style.width = '100px';
    clockDiv.style.height = '60px';
    clockDiv.style.textAlign = "center";

    clockDiv.innerText = timerCount;
    document.body.prepend(clockDiv);
  }

  function displayText() {
    let p = document.createElement('P');
    let text = oneStepAtTheTime[Math.floor(Math.random()*oneStepAtTheTime.length)];
    // debugger
    let counter = 0;
    [...text].forEach(char => {

      let t = document.createElement('SPAN')
      t.dataset.id = counter
      t.innerText = (char)
      p.appendChild(t)
      counter++
    });
    container.appendChild(p);
    container.innerHTML += "<br>";
    let inputForm = document.createElement("textarea");
    inputForm.type = 'text';
    inputForm.style.width = "100%";
    inputForm.style.height = "100px";
    inputForm.style.fontSize = "20px";
    inputForm.id = "inputTxt";
    container.appendChild(inputForm);

    let displayAcc = document.createElement("div");
    displayAcc.id = "display-accuracy";
    container.appendChild(displayAcc);

    document.addEventListener('keydown', event => {
      if(event.target.tagName === "TEXTAREA" && flag === true){
        startClock(event);
        flag = false;
      }
    });// document.addEventListener

    let pArray = Array.from(document.getElementsByTagName('P')[0].children)

    inputForm.addEventListener('keydown', event => {
      if (event.which === 16 ) {
        capitalize = true
      }
      console.log(`which is `, event.which)
      if ((event.which <= 90 && event.which >= 48) || (event.which <= 222 && event.which >= 186) || event.which === 32 ){
        counterKeystroke ++;
        startTest(event,displayAcc,pArray);
      }
    })//inputForm.addEventListener
  }

  function startTest(event,displayAcc,p) {
    let insertedLetter
    if (capitalize) {
      insertedLetter = keyCodes[event.which]
      insertedLetter = insertedLetter.toUpperCase()
      capitalize = false
    } else {
        insertedLetter = keyCodes[event.which]
    }
    let currentText = event.target.value;
    console.log(`inserted letter ${insertedLetter}`)
    let index = currentText.length;
    //console.log(p)
    console.log(`The inserted letter is ${currentText[index]}`)
    console.log(`The letter above is ${p[index].innerText}`)
    //debugger
    // p[index].innerText === currentText[index]

    if (p[index].innerText === insertedLetter){
      console.log(`The letter matches`)
      p[index].style.color = 'green';
      p[index].style.fontSize = '40px';
      correctStrokeCnt++;
    } else {
      console.log(`The letter did not matche`)
      p[index].style.color = 'red';
      p[index].style.fontSize = '40px';
    }
    displayAcc.innerText = `Accuracy: ${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%`;
  }



  function stopClock() {
    let inputForm = document.getElementById('inputTxt')
    const clockDiv = document.getElementById("clock")

    clockDiv.innerText = 0;
    let wordArray = inputForm.value.trim().split(' ')
    if (clockDiv.innerText == 0) {
      endOfGameAlert(wordArray)
    }
    disableInterval();
  }

  function endOfGameAlert(wordArray) {
    let typingAccuracy = `${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%`
    let wordsPerMin = `${wordArray.length * 6}`
    container.innerHTML += `<div><h3>Game over! Your accuracy is ${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%, and you typed ${wordArray.length * 6} words per minute. Your score is ${parseInt(typingAccuracy)*parseInt(wordsPerMin)}.</h3><button id="play-again">Play again?</button></div>`

    let playAgainButton = document.getElementById('play-again')
    playAgainButton.addEventListener('click', pageSetUp)

    let config = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({accuracy: typingAccuracy, wpm: wordsPerMin, user_id: user.id})
    }

    fetch('http://0.0.0.0:3000/api/v1/games', config).then(resp=>resp.json()).then(console.log)
  }

  getUserName()
})
