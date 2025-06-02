export function oddEvenSort(array) {
    let sorted = false;
    const moves = [];

    while (!sorted) {
        sorted = true;

        for (let i = 0; i < array.length; i += 2) {
            moves.push({ type: "comp", indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                moves.push({ type: "swap", indices: [i, i + 1] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                sorted = false;
            }
        }

        for (let i = 1; i < array.length; i += 2) {
            moves.push({ type: "comp", indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                moves.push({ type: "swap", indices: [i, i + 1] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                sorted = false;
            }
        }
    }
    return moves;
}