import { InputNumber } from "./checkNumber";
import { SplitNumber } from "./splitNumber";

export async function GetNumber() {
    const inputNumber = await InputNumber();

    return SplitNumber(inputNumber);
}