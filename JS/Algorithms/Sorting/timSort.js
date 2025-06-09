const MIN_MERGE = 32;

export function timSort(arr) {
    const moves = [];
    const n = arr.length;
    const minRun = minRunLength(MIN_MERGE);

    for (let i = 0; i < n; i += minRun) {
        insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1), moves);
    }

    for (let size = minRun; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) {
                merge(arr, left, mid, right, moves);
            }
        }
    }

    return moves;
}

function minRunLength(n) {
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

function insertionSort(arr, left, right, moves) {
    for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > temp) {
            moves.push({ type: "comp", indices: [j, j + 1] });
            arr[j + 1] = arr[j];
            moves.push({ type: "overwrite", index: j + 1, value: arr[j] });
            j--;
        }
        arr[j + 1] = temp;
        moves.push({ type: "overwrite", index: j + 1, value: temp });
    }
}

function merge(arr, l, m, r, moves) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    let i = 0,
        j = 0,
        k = l;

    while (i < left.length && j < right.length) {
        moves.push({ type: "comp", indices: [l + i, m + 1 + j] });

        if (left[i] <= right[j]) {
            arr[k] = left[i];
            moves.push({ type: "overwrite", index: k, value: left[i] });
            i++;
        } else {
            arr[k] = right[j];
            moves.push({ type: "overwrite", index: k, value: right[j] });
            j++;
        }
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i];
        moves.push({ type: "overwrite", index: k, value: left[i] });
        i++;
        k++;
    }

    while (j < right.length) {
        arr[k] = right[j];
        moves.push({ type: "overwrite", index: k, value: right[j] });
        j++;
        k++;
    }
}
