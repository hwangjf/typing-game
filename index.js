document.addEventListener("DOMContentLoaded", function() {
  const GAMES_URL = 'http://localhost:3000/api/v1/games'
  const USERS_URL = 'http://localhost:3000/api/v1/users'
  const modalDiv = document.getElementById('modal-div')
  let logInNameSpace = "Log In!";

  const oneStepAtTheTime = [
    "A Waterloo Medal was designed by sculptor Benedetto Pistrucci. Commemorating the Battle of Waterloo (18 June 1815), the medal was commissioned by the British Government in 1819 on the instructions of George IV while Prince Regent; copies were to be presented to the victorious generals and to leaders of Britain's allies. The Prince Regent and William Wellesley-Pole, Master of the Mint, had been impressed by Pistrucci's models, and gave him the commission.",
    `Augusta Ada King-Noel, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognize that the machine had applications beyond pure calculation, and published the first algorithm intended to be carried out by such a machine. As a result, she is sometimes regarded as the first to recognize the full potential of a "computing machine" and the first computer programmer.`,
    `JavaScript, often abbreviated as JS, is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm. Alongside HTML and CSS, JavaScript is one of the three core technologies of the World Wide Web. JavaScript enables interactive web pages and thus is an essential part of web applications. The vast majority of websites use it, and all major web browsers have a dedicated JavaScript engine to execute it.`,
    `Matsumoto stresses that systems design needs to emphasize human, rather than computer, needs: Often people, especially computer engineers, focus on the machines. They think, "By doing this, the machine will run fast. By doing this, the machine will run more effectively. By doing this, the machine will something something something." They are focusing on machines. But in fact we need to focus on humans, on how humans care about doing programming or operating the application of the machines. We are the masters. They are the slaves.`,
    `A space elevator is a proposed type of planet-to-space transportation system. The main component would be a cable (also called a tether) anchored to the surface and extending into space. The design would permit vehicles to travel along the cable from a planetary surface, such as the Earth's, directly into space or orbit, without the use of large rockets. An Earth-based space elevator would consist of a cable with one end attached to the surface near the equator and the other end in space beyond geostationary orbit (35,786 km altitude). The competing forces of gravity, which is stronger at the lower end, and the outward/upward centrifugal force, which is stronger at the upper end, would result in the cable being held up, under tension, and stationary over a single position on Earth. With the tether deployed, climbers could repeatedly climb the tether to space by mechanical means, releasing their cargo to orbit. Climbers could also descend the tether to return cargo to the surface from orbit.`,
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
  let txtSize = "20px";

  let timerCount = 100;
  let flag = true;
  let user;
  let usersArray = [];
  let userFlag = true;

  function requestGames() {
    console.log('this is request Games')
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

  // function getUserName() {
  //   // container.innerHTML += `Please Enter Your Name: <input id="name-input-field" type="text">
  //   // <button id="name-submit" type="submit">Submit</button>`
  //   // let submitButton = document.getElementById('name-submit')
  //   // submitButton.addEventListener('click', userPostRequest)
  // }

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
    console.log(userFlag)
    console.log(logInNameSpace)
    if (userFlag === true) {
      logInNameSpace = "Change User";
      userFlag = false;
      getModal();
    }
  }

  function pageSetUp() {
    container.innerHTML = ""
    leaderBoard.innerHTML = ""
    if (document.getElementById('clock')) {
      document.getElementById('clock').remove();
    }
    timerCount = 30;
    flag = true;
    counterKeystroke = 0;
    correctStrokeCnt = 0;
    displayClock();

    initScroller();

    displayText();
    requestGames();
    ///////////////


  }

  function getModal() {
    modalDiv.innerHTML = `<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#logInModal" style="position: absolute; right: 0px; width: 120px; margin: 10px; padding: 10px;">
      ${logInNameSpace}
    </button>

    <div class="modal fade" id="logInModal" tabindex="-1" role="dialog" aria-labelledby="ourModalDisplay" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ourModalDisplay">Start Your Engines!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Please enter your name: <input id="name-input-field" type="text"
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            <button type="button" id="submitName" class="btn btn-secondary" data-dismiss="modal">Submit Name</button>
          </div>
        </div>
      </div>
    </div>`
    const submitNameButton = document.getElementById('submitName')
    submitNameButton.addEventListener('click', userPostRequest)

  }

  function startClock() {
    intervalFn = setInterval(handleInterval, 1000);
    setTimeout(stopClock, timerCount*1000)
  }

  function handleInterval() {
    const clockDiv = document.getElementById("clock")
    clockDiv.innerText = --timerCount;
  }

  function disableInterval() {
    clearInterval(intervalFn);
  }

  function displayClock(){
    console.log('this is display Clock')
    let clockContainer = document.getElementById('clock-container')
    let clockDiv = document.createElement("div");
    clockDiv.id = "clock";
    clockDiv.style.backgroundColor = "black";
    clockDiv.style.margin = "auto";
    clockDiv.style.fontSize = '50px';
    clockDiv.style.color = 'white';

    clockDiv.style.width = '100px';
    clockDiv.style.height = '70px';
    clockDiv.style.textAlign = "center";

    clockDiv.innerText = timerCount;
    clockContainer.prepend(clockDiv);
    // let br = document.createElement('BR')
    // clockDiv.innerHTML += '<br>'
  }

  function displayText() {
    // let p = document.createElement('P');
    // let text = oneStepAtTheTime[Math.floor(Math.random()*oneStepAtTheTime.length)];
    // // debugger
    // let counter = 0;
    // [...text].forEach(char => {

    //   let t = document.createElement('SPAN')
    //   t.dataset.id = counter
    //   t.innerText = (char)
    //   p.appendChild(t)
    //   counter++
    // });

    // initScroller();
    // document.addEventListener('keyup',typingInterval);


    // container.appendChild(p);
    console.log('this is display Text')
    container.innerHTML += "<br>";
    let inputForm = document.createElement("textarea");
    inputForm.type = 'text';
    inputForm.style.width = "100%";
    inputForm.style.height = "100px";
    inputForm.style.fontSize = "20px";
    inputForm.id = "inputTxt";
    container.appendChild(inputForm);
    if (logInNameSpace === "Log In!") {
      inputForm.disabled = true;
    } else {
      inputForm.disabled = false;
    }

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

    inputForm.addEventListener('keyup', event => {
    //   console.log(`which is `, event.which)
      if ((event.which <= 90 && event.which >= 48) || (event.which <= 222 && event.which >= 186) || event.which === 32 ){
        // if(flag === true){
        //     startClock(event);
        //     flag = false;
        // }

        counterKeystroke ++;
        startTest(event,displayAcc,pArray);
      }
    })//inputForm.addEventListener
  }

  function startTest(event,displayAcc,p) {

    let currentText = event.target.value;

    let index = currentText.length -1;
    //console.log(p)

    //debugger
    // p[index].innerText === currentText[index]

    if (p[index].innerText === currentText[index]){
    //   console.log(`The letter matches`)
    //   p[index].style.color = 'green';
    //   p[index].style.fontSize = '40px';
    //   correctStrokeCnt++;
    typingInterval();

    }
    // else {
    // //   console.log(`The letter did not matche`)
    //   p[index].style.color = 'red';
    //   p[index].style.fontSize = '40px';
    // }

    correctStrokeCnt = checkTyping(currentText, p);


    displayAcc.innerText = `Accuracy: ${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%`;

  }


  function checkTyping(currentText, p) {
      let index =0;
      let counter = 0;
    [...currentText].forEach(e => {
        if (p[index].innerText === e){
            p[index].style.color = 'green';
            p[index].style.fontSize = txtSize;
            counter ++;
          } else {
            p[index].style.color = 'red';
            p[index].style.fontSize = txtSize;
          }
        index ++;
    })

    return counter;
  }

  function stopClock() {
    let inputForm = document.getElementById('inputTxt')
    const clockDiv = document.getElementById("clock")

    clockDiv.innerText = 0;
    let wordArray = inputForm.value.trim().split(' ')
    if (clockDiv.innerText == 0) {
      endOfGameAlert(wordArray)
      console.log(wordArray);
    }
    disableInterval();
  }

  function endOfGameAlert(wordArray) {
    let typingAccuracy = `${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%`
    let wordsPerMin = `${wordArray.length * 2}`
    container.innerHTML += `<div><h3>Game over! Your accuracy is ${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%, and you typed ${wordsPerMin} words per minute. Your score is ${parseInt(typingAccuracy)*parseInt(wordsPerMin)}.</h3><button id="play-again" class="btn btn-secondary">Play again?</button></div>`

    let playAgainButton = document.getElementById('play-again')
    playAgainButton.addEventListener('click', pageSetUp)

    let config = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({accuracy: typingAccuracy, wpm: wordsPerMin, user_id: user.id})
    }

    fetch('http://0.0.0.0:3000/api/v1/games', config).then(resp=>resp.json()).then(console.log)
  }

  // getUserName();
  pageSetUp();
  getModal();




  /////////////////


    var speed=3        // speed of scroller
    var step=1          // smoothness of movement


    var x, scroll, divW, sText=""

function stopScroller(){clearTimeout(scroll)}

function startScroller(){
  document.getElementById('tag').style.whiteSpace='nowrap'
  var p=document.createElement('p')
  p.id='testP'
  p.style.fontSize='25%' //fix for mozilla. multiply by 4 before using
  x-=step
  if (document.getElementById('tag').className) p.className=document.getElementById('tag').className
  p.appendChild(document.createTextNode(sText))
  document.body.appendChild(p)
  pw=p.offsetWidth
  document.body.removeChild(p)
  if (x<(pw*4)*-1){x=divW}
  document.getElementById('tag').style.left=x+'px'
  scroll=setTimeout(startScroller,speed)
}

function initScroller(){
    console.log('this is init scroller')
    test();

    document.getElementById('tag').style.whiteSpace='nowrap'

  if (document.getElementById && document.createElement && document.body.appendChild) {
    // addControls();
    divW=document.getElementById('scroller').offsetWidth;
    x=divW - 150;
    document.getElementById('tag').style.position='relative';
    document.getElementById('tag').style.left=divW+'px';
    var ss=document.getElementById('tag').childNodes;
    // debugger;
    for (i=0;i<ss.length;i++) {sText+=ss[i].nodeValue+" "};
    // scroll=setTimeout('startScroller()',speed);
    typingInterval();


  }
}


function test(){
    let text = oneStepAtTheTime[Math.floor(Math.random()*oneStepAtTheTime.length)];
    let pTag = document.createElement('p');
    let scrollerDiv = document.createElement('div');

    scrollerDiv.id = "scroller";
    pTag.id = "tag";

    pTag.style.fontSize = txtSize;

    // const p  = document.getElementById("tag");
    // debugger;

    let counter = 0;
    [...text].forEach(char => {
      let t = document.createElement('SPAN')
      t.dataset.id = counter
      t.innerText = (char)
      pTag.appendChild(t)
      counter++

    });


    scrollerDiv.appendChild(pTag);
    container.appendChild(scrollerDiv);
}


let startOrStop = true;

//moving the line longer or shorter
function typingInterval(){
    setTimeout(startAction, 10); //start the scrolling
    setTimeout(startAction, 400); // stop the scrolling
}

function startAction() {
    if(startOrStop){startScroller();startOrStop = false;}
    else{stopScroller(); startOrStop = true;}
}


})
