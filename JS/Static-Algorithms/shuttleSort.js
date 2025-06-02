export function shuttleSort(array) {
    let f = 0;
    let t = array.length - 1;

    while(f < t) {
        for(let i = 0; i <= t - 1; i++) {
            if(array[i] > array[i+1]) {
                [array[i], array[i+1]] = [array[i+1], array[i]];
            }
        }
        t--;

        for(let i = t - 1; i >= f; i--) {
            if(array[i] > array[i+1]) {
                [array[i], array[i+1]] = [array[i+1], array[i]];
            }
        }
        f++
    }
    return moves;
}