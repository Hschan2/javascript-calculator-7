import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { isContinuousSeparatorTest, isInvalidFormatTest, notInputTest, notOneCustomSeparatorTest, notPositiveNumberTest, notSeparatorTest } from "../src/test/validationTestFunc.js";
import { SplitNumber } from "../src/calculate/splitNumber.js";
import { GetOnlyNumberArray } from "../src/calculate/getOnlyNumberArray.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("문자열 계산기", () => {
  test("커스텀 구분자 사용", async () => {
    const inputs = ["//;\\n1"];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ["결과 : 1"];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("예외 테스트", async () => {
    const inputs = ["-1,2,3"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});

describe("계산 함수 유효성 검사 테스트", () => {
  test("빈 값 또는 NULL 검증", () => {
    expect(notInputTest("")).toBe(false);
    expect(notInputTest(null)).toBe(false);
    expect(notInputTest("1,2")).toBe(true);
  });

  test("구분자 유효성 검사", () => {
    expect(notSeparatorTest("1,2,3")).toBe(true);
    expect(notSeparatorTest("1:2:3")).toBe(true);
    expect(notSeparatorTest("1,,2,3")).toBe(false);
    expect(notSeparatorTest("//;\n1;2;3")).toBe(true);
    expect(notSeparatorTest("//;\n1;;2;3")).toBe(false);
  });

  test("음수 숫자 검증", () => {
    expect(notPositiveNumberTest("1,2,3")).toBe(true);
    expect(notPositiveNumberTest("-1,2,3")).toBe(false);
    expect(notPositiveNumberTest("//;\n1;2;-3")).toBe(false);
  });

  test("형식 오류 검증", () => {
    expect(isInvalidFormatTest("//;\n1;2;3")).toBe(false);
    expect(isInvalidFormatTest("//;1;2;3")).toBe(true);
    expect(isInvalidFormatTest(":1,2,3")).toBe(true);
    expect(isInvalidFormatTest("1,2,3")).toBe(false);
  });

  test("하나 이상의 커스텀 구분자 검증", () => {
    expect(notOneCustomSeparatorTest("//;\n1;2;3")).toBe(false);
    expect(notOneCustomSeparatorTest("//;;\n1;2;3")).toBe(true);
    expect(notOneCustomSeparatorTest("//??\n1?2?3")).toBe(true);
  });

  test("연속된 구분자 검증", () => {
    expect(isContinuousSeparatorTest("1,2,3")).toBe(true);
    expect(isContinuousSeparatorTest("1,,2,3")).toBe(false);
    expect(isContinuousSeparatorTest("//;\n1;2;3")).toBe(true);
    expect(isContinuousSeparatorTest("//;\n1;;2;3")).toBe(false);
  });
});

describe("숫자 계산 검증", () => {
  test("구분자 기준으로 분리", () => {
    // 기본 구분자
    expect(SplitNumber("1,2,3")).toEqual([1, 2, 3]);
    expect(SplitNumber("1:2:3")).toEqual([1, 2, 3]);
    expect(SplitNumber("1,2:3")).toEqual([1, 2, 3]);

    // 커스텀 구분자
    expect(SplitNumber("//;\n1;2;3")).toEqual([1, 2, 3]);
    expect(SplitNumber("//-\n1-2-3")).toEqual([1, 2, 3]);

    // 숫자가 아닌 다른 문자 포함
    expect(SplitNumber("1,2,3,a")).toEqual([1, 2, 3, NaN]);
  });

  test("숫자 배열만 반환 및 유효성 검사", () => {
    // 배열에 숫자만
    expect(GetOnlyNumberArray("1,2,3")).toEqual([1, 2, 3]);

    // 배열에 다른 문자 포함: 에러 메세지
    expect(() => GetOnlyNumberArray("1,2,3,a")).toThrowError("[ERROR] 숫자가 아닌 다른 문자가 포함되어 있습니다.");
  });
});
