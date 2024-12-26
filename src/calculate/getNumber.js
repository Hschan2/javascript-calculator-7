import { InputNumber } from "./checkNumber";
import { GetOnlyNumberArray } from "./getOnlyNumberArray";

export async function GetNumber() {
    const inputNumber = await InputNumber();

    return GetOnlyNumberArray(inputNumber);
}