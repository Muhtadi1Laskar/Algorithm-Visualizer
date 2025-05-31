import {bubbleSort} from '../Algorithms/Sorting/bubbleSort.js';

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

function renderBars(indices = []) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${array[i] * 100}%`;
        if (indices.includes(i)) {
            bar.classList.add("highlight");
        }
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

    currentTimeout = setTimeout(() => animateMoves(moves), 20);
}

function selectionSort(arr) {
    const moves = [];

    for (let i = 0; i < arr.length; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            moves.push({ type: "comp", indices: [min, j] });
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
            moves.push({ type: "swap", indices: [i, min] });
        }
    }
    return moves;
}

function insertionSort(arr) {
    const moves = [];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            moves.push({ type: "comp", indices: [j, j + 1] });
            arr[j + 1] = arr[j];
            moves.push({ type: "set", index: j + 1, value: arr[j] });
            j--;
        }
        arr[j + 1] = key;
        moves.push({ type: "set", index: j + 1, value: key });
    }
    return moves;
}

function mergeSort(arr) {
    const moves = [];
    const temp = [...arr];

    function merge(start, mid, end) {
        let i = start, j = mid, k = start;

        while (i < mid && j < end) {
            moves.push({ type: "comp", indices: [i, j] });
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i < mid) temp[k++] = arr[i++];
        while (j < end) temp[k++] = arr[j++];

        for (let l = start; l < end; l++) {
            arr[l] = temp[l];
            moves.push({ type: "set", index: l, value: arr[l] });
        }
    }

    function divide(start, end) {
        if (end - start <= 1) return;
        const mid = Math.floor((start + end) / 2);
        divide(start, mid);
        divide(mid, end);
        merge(start, mid, end);
    }

    divide(0, arr.length);
    return moves;
}

function quickSort(arr) {
    const moves = [];
    quickSortHelper(arr, 0, arr.length - 1, moves);
    return moves;
}

function quickSortHelper(arr, low, high, moves) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high, moves);
        quickSortHelper(arr, low, pivotIndex - 1, moves);
        quickSortHelper(arr, pivotIndex + 1, high, moves);
    }
}

function partition(arr, low, high, moves) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        moves.push({ type: "comp", indices: [j, high] }); // Compare with pivot
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            moves.push({ type: "swap", indices: [i, j] }); // Swap with smaller
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    moves.push({ type: "swap", indices: [i + 1, high] }); // Final pivot swap
    return i + 1;
}

resetButton.addEventListener("click", init);
algoSelect.addEventListener("change", init);
playButton.addEventListener("click", play);

init();