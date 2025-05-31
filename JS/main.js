import {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort
} from '../Algorithms/Sorting/sortingAlgorithms.js';

const container = document.getElementById("container");
const resetButton = document.getElementById("reset-btn");
const playButton = document.getElementById("sort-btn");
const algoSelect = document.getElementById("algo-select");

const n = 50;
const array = [];

let isSorting = false;
let currentTimeout = null;

function init() {
    isSorting = false;
    clearTimeout(currentTimeout);
    array.length = 0;
    for (let i = 0; i < n; i++) {
        array.push(Math.random());
    }
    renderBars();
}

function renderBars(highlighted = []) {
  container.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.className = "bar";
    if (highlighted.includes(i)) bar.classList.add("red");
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
    }

    animateMoves(moves);
}

function animateMoves(moves) {
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

    currentTimeout = setTimeout(() => animateMoves(moves), 10);
}

resetButton.addEventListener("click", init);
algoSelect.addEventListener("change", init);
playButton.addEventListener("click", play);

init();