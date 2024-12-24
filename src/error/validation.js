import { notInputNumberMessage, notPositiveNumberMessage, notSeparatorMessage } from "./messages";

export function isValidNumber(number) {
    if (!notInput(number)) {
        throw new Error(notInputNumberMessage);
    }

    if (!notSeparator(number)) {
        throw new Error(notSeparatorMessage);
    }

    if (!notPositiveNumber(number)) {
        throw new Error(notPositiveNumberMessage);
    }
}

function notInput(number) {
    if (number === '' || number === null) return false;

    return true;
}

function notSeparator(number) {
    let customDelimiterMatch = number.match(/^\/\/(.+)(\\n|\\\\n|\n)/);
    let customDelimiter = customDelimiterMatch ? customDelimiterMatch[1] : null;

    if (customDelimiter) {
        number = number.replace(/^\/\/(.+)(\\n|\\\\n|\n)/, '');
        number = number.replace(/\\n/g, '\n');
        const validPattern = new RegExp(`^[0-9]+(${customDelimiter}[0-9]+)*$`);
        return validPattern.test(number);
    } else {
        const validPattern = /^[0-9]+([,:][0-9]+)*$/;
        return validPattern.test(number);
    }
}

function notPositiveNumber(number) {
    const match = number.match(/^\/\/(.+)\n(.*)/);
    const delimiter = match ? new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g') : /[,:]/;
    const numbersPart = match ? match[2] : number;
    const numbers = numbersPart.split(delimiter).map(Number);

    const negatives = numbers.filter(num => num < 0);
    if (negatives.length) return false;

    return true;
}