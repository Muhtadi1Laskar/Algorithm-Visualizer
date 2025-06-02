import { bubbleSort } from "./bubbleSort.js";
import { combSort } from "./combSort.js";
import { gnomeSort } from "./gnomeSort.js";
import { insertionSort } from "./insertionSort.js";
import { mergeSort } from "./mergeSort.js";
import { oddEvenSort } from "./oddEvenSort.js";
import { quickSort } from "./quickSort.js";
import { selectionSort } from "./selectionSort.js";
import { shuttleSort } from "./shuttleSort.js";

export const codeSnippets = {
  bubble: `${bubbleSort}`,
  selection: `${selectionSort}`,
  insertion: `${insertionSort}`,
  merge: `${mergeSort}`,
  quick: `${quickSort}`,
  comb: `${combSort}`,
  'odd-even': `${oddEvenSort}`,
  gnome: `${gnomeSort}`,
  shuttle: `${shuttleSort}`
};
