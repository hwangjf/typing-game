document.addEventListener("DOMContentLoaded", function() {
    const oneStepAtTheTime = ["A Waterloo Medal was designed by sculptor Benedetto Pistrucci. Commemorating the Battle of Waterloo (18 June 1815), the medal was commissioned by the British Government in 1819 on the instructions of George IV while Prince Regent; copies were to be presented to the victorious generals and to leaders of Britain's allies. The Prince Regent and William Wellesley-Pole, Master of the Mint, had been impressed by Pistrucci's models, and gave him the commission."]

    const container = document.getElementById("container");

    let intervalFn;
    let counterKeystroke = 0;
    let correctStrokeCnt = 0;
    let wpm;

    let timerCount = 5;
    let flag = true;
    let user;



    function getUserName() {
      container.innerHTML += `Please Enter Your Name: <input id="name-input-field" type="text">
      <button id="name-submit" type="submit">Submit</button>`
      let submitButton = document.getElementById('name-submit')
      submitButton.addEventListener('click', userPostRequest)
    }

    function userPostRequest(e) {
      // e.preventDefault()
      let nameInput = document.getElementById('name-input-field').value

      let config = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: nameInput})
      }

      fetch('http://0.0.0.0:3000/api/v1/users', config).then(resp=>resp.json()).then(data => user = data).then(pageSetUp)

    }

    function pageSetUp() {
      console.log(user)
      container.innerHTML = ""
      if (document.getElementById('clock')) {
        document.getElementById('clock').remove();
      }
      timerCount = 10;
      displayClock();
      displayText();
    }

    function startClock() {
         intervalFn = setInterval(handleInterval, 1000);
         setTimeout(stopClock, 10000)
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
        container.innerText = oneStepAtTheTime[0];
        container.innerHTML += "<br>"; 
        container.style.fontSize = '30px'
        let inputForm = document.createElement("textarea");
        inputForm.type = 'text';
        // inputForm.rows = "6";
        // inputForm.cols = "120"
        inputForm.style.width = "100%";
        inputForm.style.height = "100px";
        inputForm.style.fontSize = "20px";
        // inputForm.style.alignSelf = "center";
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


        inputForm.addEventListener('keyup', event => {
            if ((event.which <= 90 && event.which >= 48) || (event.which <= 222 && event.which >= 186) || event.which === 32 ){
                counterKeystroke ++;
                startTest(event,displayAcc);
            }else{ console.log(event.target)}
        })//inputForm.addEventListener

    }

    function startTest(event,displayAcc) {
        let currentText = event.target.value;
        let index = currentText.length -1;
        // debugger;
        // console.log(timerCount);


        if (container.innerText[index] === currentText[index]){
            document.body.style.backgroundColor = 'green';
            correctStrokeCnt ++;
        }else{
            document.body.style.backgroundColor = 'red';
        }
        // console.log(counterKeystroke);
        // console.log(correctStrokeCnt);

        displayAcc.innerText = `${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%`;

    }

    function stopClock() {
          // if (timerCount < 1){
          let inputForm = document.getElementById('inputTxt')
          const clockDiv = document.getElementById("clock")
          // timerCount = 0;
          clockDiv.innerText = 0;
          let wordArray = inputForm.value.trim().split(' ')
          if (clockDiv.innerText == 0) {
            endOfGameAlert(wordArray)
          }
          // event.target.disabled = true;
          disableInterval();
        // }
    }

    function endOfGameAlert(wordArray) {
      // alert(`Time out! Your accuracy is ${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%, and you typed ${wordArray.length * 2} words per minute.`)
      let typingAccuracy = `${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%`
      let wordsPerMin = `${wordArray.length * 6}`
      container.innerHTML += `<div><h3>Game over! Your accuracy is ${parseFloat((correctStrokeCnt/counterKeystroke)*100).toFixed(2)}%, and you typed ${wordArray.length * 6} words per minute.</h3><button id="play-again">Play again?</button></div>`

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
    // pageSetUp()


})
