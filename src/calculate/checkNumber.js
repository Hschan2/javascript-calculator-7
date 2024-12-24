import { MissionUtils } from "@woowacourse/mission-utils";
import { isValidNumber } from "../error/validation";
import { startMessage } from "../constants/message";

export async function InputNumber() {
    const inputNumbers = await MissionUtils.Console.readLineAsync(startMessage);
    isValidNumber(inputNumbers);

    return inputNumbers;
}