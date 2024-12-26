export function notInputTest(number) {
    if (number === '' || number === null) return false;

    return true;
}

export function notSeparatorTest(number) {
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

export function notPositiveNumberTest(number) {
    const match = number.match(/^\/\/(.+)\n(.*)/);
    const delimiter = match ? new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g') : /[,:]/;
    const numbersPart = match ? match[2] : number;
    const numbers = numbersPart.split(delimiter).map(Number);

    const negatives = numbers.filter(num => num < 0);
    if (!negatives.length) return true;

    return false;
}

export function isInvalidFormatTest(number) {
    if (number.startsWith('//') && !number.includes('\n')) {
        return true;
    }

    if (!number.startsWith('//') && /[^0-9a-zA-Z]/.test(number[0])) {
        return true;
    }

    return false;
}

export function notOneCustomSeparatorTest(number) {
    const match = number.match(/^\/\/(.+)\n/);
    if (!match) return false;

    const delimiter = match[1];
    return /(.)\1+/.test(delimiter);
}

export function isContinuousSeparatorTest(number) {
    const match = number.match(/^\/\/(.+)\n/);
    if (match) {
        const customDelimiter = match[1];
        const numbersPart = number.slice(match[0].length);
        const hasConsecutiveDelimiters = new RegExp(`(${customDelimiter})\\1+`);
        return !hasConsecutiveDelimiters.test(numbersPart);
    }

    const hasConsecutiveDelimiters = /([,:])\1+/;
    return !hasConsecutiveDelimiters.test(number);
}