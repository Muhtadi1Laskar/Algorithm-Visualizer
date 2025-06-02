export function heapSort(arr) {
  const moves = [];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, moves);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    moves.push({ type: "swap", indices: [0, i] });

    heapify(arr, i, 0, moves);
  }

  return moves;
}

function heapify(arr, heapSize, rootIndex, moves) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize) {
    moves.push({ type: "comp", indices: [left, largest] });
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < heapSize) {
    moves.push({ type: "comp", indices: [right, largest] });
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    moves.push({ type: "swap", indices: [rootIndex, largest] });

    heapify(arr, heapSize, largest, moves);
  }
}
