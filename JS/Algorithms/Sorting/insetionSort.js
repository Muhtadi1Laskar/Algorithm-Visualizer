export function insertionSort(arr) {
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