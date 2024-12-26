import { notNumberMessage } from "../error/messages";
import { SplitNumber } from "./splitNumber";

export function GetOnlyNumberArray(number) {
    const getOnlyNumber = SplitNumber(number);
    const checkIsNumber = getOnlyNumber.map((n) => isNaN(n)).includes(true);

    if (checkIsNumber) {
        throw new Error(notNumberMessage);
    }

    return getOnlyNumber;
}