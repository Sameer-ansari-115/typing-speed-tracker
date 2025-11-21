let word = document.getElementById("word"),
    text = document.getElementById("text"),
    results = document.getElementById("score"),
    allTimes = document.getElementById("time"),
    final = document.getElementById("game-over"),
    resetBtn = document.getElementById("set-btn"),
    option = document.getElementById("sets"),
    res = document.getElementById("form"),
    hard = document.getElementById("level"),
    startBtn = document.getElementById("start-btn");

// Word List
let words = [
    "address","sameer","chandan","marwadi","programming","keyboard","castle",
    "algorithm","chromebrowser","webdeveloper","function","victus","class",
    "javascript","stylesheet","storage","memmory","smart","phone","data"
];

let timeInterval;
let allWords;
let total = 0;
let time = 30;
let testStarted = false;

let level = localStorage.getItem("level") || "medium";

function characters() {
    return words[Math.floor(Math.random() * words.length)];
}

function totalScore() {
    total++;
    results.innerText = total;
}

function wordsPower() {
    allWords = characters();
    word.innerText = allWords;
}

function timeTack() {
    time--;
    allTimes.innerText = time + "s";

    if (time <= 0) {
        clearInterval(timeInterval);
        endGame();
    }
}

function endGame() {
    final.innerHTML = `
        <h1>Time Over</h1>
        <p>Final score is ${total}</p>
        <button onclick="history.go(0)">Play Again</button>
    `;
    final.style.display = "flex";
}

// Start Function
function startGame() {
    if (testStarted) return;
    testStarted = true;

    startBtn.style.display = "none"; 
    text.disabled = false;

    time = 30;
    total = 0;

    results.innerText = total;
    allTimes.innerText = time + "s";

    wordsPower();
    text.focus();

    timeInterval = setInterval(timeTack, 1000);
}

// Start Button Event
startBtn.addEventListener("click", startGame);

// Settings Toggle
resetBtn.addEventListener("click", () => {
    option.classList.toggle("show");
});

// Difficulty Setting Change
res.addEventListener("change", (e) => {
    level = e.target.value;
    localStorage.setItem("level", level);
});

// Typing Logic
text.addEventListener("input", (e) => {
    if (!testStarted) return;

    const insertedText = e.target.value;

    if (insertedText === allWords) {
        e.target.value = "";
        wordsPower();
        totalScore();

        if (level === "hard") time += 2;
        else if (level === "medium") time += 3;
        else time += 5;
    }
});

hard.value = level;
