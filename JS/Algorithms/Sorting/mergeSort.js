export function mergeSort(arr) {
    const moves = [];
    const temp = [...arr];

    function merge(start, mid, end) {
        let i = start, j = mid, k = start;

        while (i < mid && j < end) {
            moves.push({ type: "comp", indices: [i, j] });
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i < mid) temp[k++] = arr[i++];
        while (j < end) temp[k++] = arr[j++];

        for (let l = start; l < end; l++) {
            arr[l] = temp[l];
            moves.push({ type: "set", index: l, value: arr[l] });
        }
    }

    function divide(start, end) {
        if (end - start <= 1) return;
        const mid = Math.floor((start + end) / 2);
        divide(start, mid);
        divide(mid, end);
        merge(start, mid, end);
    }

    divide(0, arr.length);
    return moves;
}