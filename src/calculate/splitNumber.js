export function SplitNumber(number) {
    const match = number.match(/^\/\/(.+)(\\n|\\\\n|\n)(.*)/);
    const delimiter = match ? new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g') : /[,:]/;
    const numbersPart = match ? match[3] : number;
    const normalizedNumbers = numbersPart.replace(/\\n/g, '\n');
    const numbers = normalizedNumbers.split(delimiter).map(Number);

    return numbers;
}