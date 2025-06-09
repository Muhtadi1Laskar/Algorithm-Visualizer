export function quickSort(arr) {
    quickSortHelper(arr, 0, arr.length - 1);
    return arr;
}

export function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
    }
}

export function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}


const array = [2, 3, 1, 666, 8, 43, 9, 43, 6];
console.log(quickSort(array));