
document.addEventListener("DOMContentLoaded", function() {
    const oneStepAtTheTime = ["A Waterloo Medal was designed by sculptor Benedetto Pistrucci. Commemorating the Battle of Waterloo (18 June 1815), the medal was commissioned by the British Government in 1819 on the instructions of George IV while Prince Regent; copies were to be presented to the victorious generals and to leaders of Britain's allies. The Prince Regent and William Wellesley-Pole, Master of the Mint, had been impressed by Pistrucci's models, and gave him the commission."]

    const container = document.getElementById("container");

    let counterKeystroke = 0;
    let correctStrokeCnt = 0;


    function displayText() {
        container.innerText = oneStepAtTheTime[0];
        container.innerHTML += "<br>"; 
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
        if (container.innerText[index] === currentText[index]){
            document.body.style.backgroundColor = 'green';
            correctStrokeCnt ++;
        }else{
            document.body.style.backgroundColor = 'red';
        }
        console.log(counterKeystroke);
        console.log(correctStrokeCnt);

        displayAcc.innerText = `${(correctStrokeCnt/counterKeystroke).toFixed(2)*100}%`;

    }

    displayText();

})