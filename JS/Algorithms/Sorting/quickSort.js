export function quickSort(arr) {
  const moves = [];
  quickSortHelper(arr, 0, arr.length - 1, moves);
  return moves;
}

function quickSortHelper(arr, low, high, moves) {
  while (low < high) {
    const pivotIndex = partition(arr, low, high, moves);

    if (pivotIndex - low < high - pivotIndex) {
      quickSortHelper(arr, low, pivotIndex - 1, moves);
      low = pivotIndex + 1;
    } else {
      quickSortHelper(arr, pivotIndex + 1, high, moves);
      high = pivotIndex - 1;
    }
  }
}

function partition(arr, low, high, moves) {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    moves.push({ type: "comp", indices: [j, high] });
    if (arr[j] <= pivot) {
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        moves.push({ type: "swap", indices: [i, j] });
      }
      i++;
    }
  }

  if (i !== high) {
    [arr[i], arr[high]] = [arr[high], arr[i]];
    moves.push({ type: "swap", indices: [i, high] });
  }

  return i;
}
