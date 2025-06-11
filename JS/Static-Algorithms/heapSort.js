export function heapSort(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, moves);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];

        heapify(arr, i, 0, moves);
    }

    return moves;
}

export function heapify(arr, heapSize, rootIndex) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < heapSize) {
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    if (right < heapSize) {
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];

        heapify(arr, heapSize, largest, moves);
    }
}

