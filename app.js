import { questions } from './data.js'; //Importerar objekt med frågor

//initialize variables 
const options = Array.from(document.querySelectorAll('.question-container div'));
const questionHeader = document.querySelector('.question-container span');
const questionContainer = document.querySelector('.question-container .header');
const question = document.querySelector('.question-container');
const playerOneContainer = document.querySelector('.player-1');
const playerTwoContainer = document.querySelector('.player-2');
const playerOneScoreTxt = document.querySelector('#score-1');
const playerTwoScoreTxt = document.querySelector('#score-2');
const startBtn = document.querySelector('#startBtn');

let indexCount = 0;
let current = questions[indexCount];

let currentAnswer = current.answer;
let activePlayer = 1;

let playerOneScore = 0;
let playerTwoScore = 0;

let aCount = 1;


questionHeader.innerText = 'Välkommen till denna awesome quiz!'; // Välkomnar spelaren  

startBtn.onclick = () => startQuiz(); // Startar spelet


const playerSelector = () => { // Väljer spelare och ökar progressbar med ett steg


    if (playerOneContainer.classList.contains('hidden-class')) {
        activePlayer = 1;



        setTimeout(() => {
            playerOneContainer.classList.remove('hidden-class');
            playerTwoContainer.classList.add('hidden-class');
            aCount++
            question.classList.remove('no-pointer-events')
            startQuiz();
        }, 1000);

    } else {
        playerOneContainer.classList.add('hidden-class');
        activePlayer = 2;


        setTimeout(() => {
            question.classList.remove('no-pointer-events')
            playerTwoContainer.classList.remove('hidden-class');
            startQuiz();
        }, 1000);
    }
}

const startQuiz = () => { // Kollar om spelare har vunnit eller om det har blivit oavgjort
    startBtn.style.display = 'none'; // Plockar bort startknapp
    if (indexCount == questions.length + 1) {
        if (playerOneScore === playerTwoScore) {
            questionHeader.innerText = 'Oavgjort!';
            questionContainer.classList.add('draw');
            return;
        } else {
            questionContainer.classList.add('blink');
            questionHeader.innerText = `Vinnaren är ${playerOneScore > playerTwoScore ? 'Spelare 1 🏆' : 'Spelare 2 🏆'}`;
            return;
        }
    }

    // Räknar progress bar referensvärde
    const a = document.querySelector(`#a${aCount}`);
    const b = document.querySelector(`#b${aCount}`);

    options.forEach(item => {  // Tar bort svarsalternativen
        item.classList.remove('correct');
        item.classList.remove('wrong');
    });
    //Kollar gällande index i array och presenterar ny fråga
    current = questions[`${indexCount++}`];
    currentAnswer = current.answer;
    questionHeader.innerText = current.question;

    Object.entries(current).forEach(([key, value]) => { // Kollar entry index på array (gällande objekt)
        if (key.includes('opt')) { // Kollar om innehåller "option"
            document.querySelector(`.${key}`).innerText = value;
        }
    });

    options.forEach(item => { // Kollar huruvida aktiv spelare svarar rätt på frågan

        item.onclick = () => {
            question.classList.add('no-pointer-events')
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

            playerOneScoreTxt.innerHTML = `: ${playerOneScore}`;
            playerTwoScoreTxt.innerHTML = `: ${playerTwoScore}`;
        }
    });
}


