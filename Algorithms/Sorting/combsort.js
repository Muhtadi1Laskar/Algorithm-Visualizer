export function combSort(array) {
    let shrinkFactor = 1.3;
    let gap = array.length;
    let swapped = true;
    const moves = [];

    while (gap > 1 || swapped) {
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1;

        swapped = false;

        for (let i = 0; i + gap < array.length; i++) {
            moves.push({ type: "comp", indices: [i, i + gap] });

            if (array[i] > array[i + gap]) {
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                moves.push({ type: "swap", indices: [i, i + gap] });
                swapped = true;
            }
        }
    }

    return moves;
}
