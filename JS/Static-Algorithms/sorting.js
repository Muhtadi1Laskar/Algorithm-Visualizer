import { bubbleSort } from "./bubbleSort.js";
import { combSort } from "./combSort.js";
import { gnomeSort } from "./gnomeSort.js";
import { heapify, heapSort } from "./heapSort.js";
import { insertionSort } from "./insertionSort.js";
import { merge, mergeSort } from "./mergeSort.js";
import { oddEvenSort } from "./oddEvenSort.js";
import { partition, quickSort, quickSortHelper } from "./quickSort.js";
import { selectionSort } from "./selectionSort.js";
import { shuttleSort } from "./shuttleSort.js";

export const codeSnippets = {
  bubble: `${bubbleSort}`,
  selection: `${selectionSort}`,
  insertion: `${insertionSort}`,
  merge: `${merge} \n \n ${mergeSort}`,
  quick: `${quickSort} \n \n ${quickSortHelper} \n \n ${partition}`,
  comb: `${combSort}`,
  'odd-even': `${oddEvenSort}`,
  gnome: `${gnomeSort}`,
  shuttle: `${shuttleSort}`,
  heap: `${heapSort} \n \n ${heapify}`
};
