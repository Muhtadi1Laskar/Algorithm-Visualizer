export function shuttleSort(array) {
    let f = 0;
    let t = array.length - 1;
    const moves = [];

    while (f < t) {
        for (let i = 0; i <= t - 1; i++) {
            moves.push({ type: "comp", indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                moves.push({ type: "swap", indices: [i, i + 1] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
        t--;

        for (let i = t - 1; i >= f; i--) {
            moves.push({ type: "comp", indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                moves.push({ type: "swap", indices: [i, i + 1] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
        f++
    }
    return moves;
}