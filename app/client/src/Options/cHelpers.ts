export function roundNum(number: number, ends = 0) {
    return parseFloat(number.toFixed(ends));
}