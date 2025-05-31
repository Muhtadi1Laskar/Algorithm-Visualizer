export function selectionSort(arr) {
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