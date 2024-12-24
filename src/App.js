import { MissionUtils } from "@woowacourse/mission-utils";
import { GetNumber } from "./calculate/getNumber";

class App {
  async run() {
    const inputNumbers = await GetNumber();
    const sum = await this.sumNumbers(inputNumbers);

    MissionUtils.Console.print(`결과 : ${sum}`);
  }

  async sumNumbers(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
  }
}

export default App;
