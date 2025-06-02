export function gnomeSort(array) {
    let index = 0;
    let moves = [];

    while (index < array.length) {
        if (index === 0) {
            index += 1;
        } else if (array[index] >= array[index - 1]) {
            moves.push({ type: "comp", indices: [index, index - 1] });
            index++
        } else {
            moves.push({ type: "swap", indices: [index, index - 1] });
            [array[index], array[index - 1]] = [array[index - 1], array[index]];
            index--;
        }
    }
    return moves;
}