import { questions } from './data.js';

const options = Array.from(document.querySelectorAll('.question-container div'));
const questionHeader = document.querySelector('.question-container span');
const playerOneContainer = document.querySelector('.player-1');
const playerTwoContainer = document.querySelector('.player-2');
const playerOneScoreTxt = document.querySelector('#score-1');
const playerTwoScoreTxt = document.querySelector('#score-2');
const startBtn = document.querySelector('#startBtn');
let indexCount = 0;
var current = questions[indexCount];


let currentAnswer = current.answer;
let activePlayer = 1;

let playerOneScore = 0;
let playerTwoScore = 0;

let aCount = 1;




//console.log(options);
console.log(current);

// Välkomst-text i h4
questionHeader.innerText = 'Välkommen till denna awesome quiz!';


// Presentera start-knapp
startBtn.onclick = () => startQuiz();


const playerSelector = () => {
    if (playerOneContainer.classList.contains('hidden-class')) {
        activePlayer = 1;

        setTimeout(() => {
            playerOneContainer.classList.remove('hidden-class');
            playerTwoContainer.classList.add('hidden-class');
            aCount++

            startQuiz();
        }, 2000);

    } else {
        playerOneContainer.classList.add('hidden-class');
        activePlayer = 2;

        setTimeout(() => {
            playerTwoContainer.classList.remove('hidden-class');
            startQuiz();
        }, 2000);
    }
}


const startQuiz = () => {


    if (indexCount == questions.length + 1) {
        if (playerOneScore === playerTwoScore) {
            questionHeader.innerText = 'Oavgjort!';
            return;
        } else {
            questionHeader.innerText = `Vinnaren är ${playerOneScore > playerTwoScore ? 'Spelare 1' : 'Spelare 2'}!`;
            return;
        }
    }


    const a = document.querySelector(`#a${aCount}`);
    const b = document.querySelector(`#b${aCount}`);



    options.forEach(item => {
        item.classList.remove('correct');
        item.classList.remove('wrong');
    });

    current = questions[`${indexCount++}`];
    currentAnswer = current.answer;
    questionHeader.innerText = current.question;

    Object.entries(current).forEach(([key, value]) => {
        if (key.includes('opt')) {
            document.querySelector(`.${key}`).innerText = value;
        }
    });

    options.forEach(item => {

        item.onclick = () => {


            if (item.className.substr(0, 4) === currentAnswer) {
                activePlayer === 1 ? playerOneScore++ : playerTwoScore++;
                activePlayer === 1 ? a.style.backgroundColor += '#2ecc71' : b.style.backgroundColor += '#2ecc71';
                item.classList.add('correct');
                playerSelector();


            } else {
                document.querySelector(`.${currentAnswer} `).classList.add('correct');
                item.classList.add('wrong');
                activePlayer === 1 ? a.style.backgroundColor += '#e74c3c' : b.style.backgroundColor += '#e74c3c';
                playerSelector();
            }

            playerOneScoreTxt.innerHTML = `: ${playerOneScore}`
            playerTwoScoreTxt.innerHTML = `: ${playerTwoScore}`

        }


    });
}


