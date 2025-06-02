export function bubbleSort(arr) {
    const moves = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < arr.length; i++) {
            moves.push({ type: "comp", indices: [i - 1, i] });
            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                moves.push({ type: "swap", indices: [i - 1, i] });
                swapped = true;
            }
        }
    } while (swapped);
    return moves;
}