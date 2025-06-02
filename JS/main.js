import {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    gnomeSort,
    combSort,
    oddEvenSort,
    shuttleSort
} from './Algorithms/Sorting/sortingAlgorithms.js';
import { codeSnippets } from './Static-Algorithms/sorting.js';

const container = document.getElementById("container");
const resetButton = document.getElementById("reset-btn");
const playButton = document.getElementById("sort-btn");
const algoSelect = document.getElementById("algo-select");
const speedSelect = document.getElementById("speed-select");
const sortNumbers = document.getElementById("sorting-number");
const themeButton = document.getElementById("toggle-theme");
const codeDiv = document.getElementById("code");
const codeBlock = document.getElementById("code-block");

const n = +sortNumbers.value || 10;
const array = [];

let isSorting = false;
let currentTimeout = null;


function setTheme(dark) {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    themeButton.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    setTheme(true);
}


function init() {
    let n = +sortNumbers.value;

    if(isNaN(n) || n < 5 || n > 200) {
        n = 50;
    }

    isSorting = false;
    clearTimeout(currentTimeout);
    array.length = 0;
    for (let i = 0; i < n; i++) {
        array.push(Math.random());
    }
    renderBars();
}

function renderBars(highlighted = [], color = 'red') {
    container.style.visibility = "visible";
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.className = "bar";
        if (highlighted.includes(i)) bar.classList.add(color);
        container.appendChild(bar);
    }
}


function play() {
    if (isSorting) return;

    isSorting = true;
    const copy = [...array];
    const algo = algoSelect.value;
    let moves = [];

    switch (algo) {
        case "bubble":
            moves = bubbleSort(copy);
            break;
        case "selection":
            moves = selectionSort(copy);
            break;
        case "insertion":
            moves = insertionSort(copy);
            break;
        case "merge":
            moves = mergeSort(copy);
            break;
        case "quick":
            moves = quickSort(copy);
            break;
        case "gnome":
            moves = gnomeSort(copy);
            break;
        case "comb":
            moves = combSort(copy);
            break;
        case "odd-even":
            moves = oddEvenSort(copy);
            break;
        case "shuttle":
            moves = shuttleSort(copy);
            break;
    }

    animateMoves(moves);
}

function animateMoves(moves) {
    const speed = +speedSelect.value;

    if (!isSorting || moves.length === 0) {
        renderBars();
        isSorting = false;
        return;
    }

    const move = moves.shift();

    if (move.type === "comp") {
        renderBars(move.indices);
    } else if (move.type === "swap") {
        const [i, j] = move.indices;
        [array[i], array[j]] = [array[j], array[i]];
        renderBars([i, j]);
    } else if (move.type === "set") {
        array[move.index] = move.value;
        renderBars([move.index]);
    }

    currentTimeout = setTimeout(() => animateMoves(moves), speed);
}

const renderCode = () => {
    const algo = algoSelect.value;
    const result = codeSnippets[algo] || ' ';

    codeBlock.textContent = result.trim();
    codeDiv.style.visibility = "visible";
    Prism.highlightElement(codeBlock);
}

const toggleDarkTheme = () => {
    const isDark = document.body.classList.contains("dark");
    setTheme(!isDark);
}


resetButton.addEventListener("click", init);
algoSelect.addEventListener("change", init);
algoSelect.addEventListener("change", renderCode);
speedSelect.addEventListener("change", init);
sortNumbers.addEventListener("keyup", init);
sortNumbers.addEventListener("change", init);
playButton.addEventListener("click", play);
themeButton.addEventListener("click", toggleDarkTheme);

// init();