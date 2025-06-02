export function quickSort(arr) {
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
