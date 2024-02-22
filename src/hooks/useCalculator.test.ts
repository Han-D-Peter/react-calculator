import { describe, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import useCalculator from "./useCalculator";

describe("useCalculator", () => {
  const { result: hooksREsult } = renderHook(() => useCalculator());
  const { result, pressNumber, calculate, pressOperator, allClear } =
    hooksREsult.current;

  function pressDigits(digits: string[]) {
    digits.forEach((digit) => {
      pressNumber(digit);
    });
  }

  function isEqualValueFromDisplay(text: string) {
    return result === text;
  }

  it("숫자 버튼을 누르면 display에 숫자가 표시", () => {
    pressDigits(["1"]);
    isEqualValueFromDisplay("1");
    allClear();
  });

  it("숫자 버튼을 여러 번 누르면 display에 숫자가 누적 표시", () => {
    pressDigits(["1", "2", "3"]);
    isEqualValueFromDisplay("123");
    allClear();
  });

  it("숫자 버튼은 최대 3자리까지만 표시", () => {
    pressDigits(["1", "2", "3", "4"]);
    isEqualValueFromDisplay("123");
    allClear();
  });

  it("숫자 버튼을 누르고 연산자 버튼을 누르면 display에 연산자 표시", () => {
    pressDigits(["1", "2", "3"]);
    pressOperator("+");
    isEqualValueFromDisplay("123+");
    allClear();
  });

  it("연산자 버튼을 여러 번 누르면 display에 마지막 연산자만 표시", () => {
    pressDigits(["1", "2", "3"]);
    pressOperator("+");
    pressOperator("-");
    isEqualValueFromDisplay("123-");
    allClear();
  });

  it("2번째 숫자를 입력하면 display에 2번째 숫자를 누적하여 표시", () => {
    pressDigits(["1", "2", "3"]);
    pressOperator("+");
    pressDigits(["4", "5", "6"]);
    isEqualValueFromDisplay("123+456");
    allClear();
  });

  it("1번째 숫자와 2번째 숫자를 입력하고 = 버튼을 누르면 display에 계산 결과 표시", () => {
    pressDigits(["1", "2", "3"]);
    pressOperator("+");
    pressDigits(["4", "5", "6"]);
    calculate();
    isEqualValueFromDisplay("579");
    allClear();
  });

  it("AC 버튼을 누르면 display에 0 표시", () => {
    pressDigits(["1", "2", "3"]);
    allClear();
    isEqualValueFromDisplay("0");
  });
  it("연산의 결과값이 Infinity일 경우 오류라는 문자열을 보여준다.", () => {
    pressDigits(["3"]);
    pressOperator("/");
    pressDigits(["0"]);
    calculate();
    isEqualValueFromDisplay("오류");
    allClear();
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다", () => {
    pressDigits(["4"]);
    pressOperator("/");
    pressDigits(["3"]);
    calculate();
    isEqualValueFromDisplay("1");
    allClear();
  });

  it("계산 결과에 이어서 연산 수행", () => {
    pressDigits(["123"]);
    pressOperator("+");
    pressDigits(["123"]);
    calculate();
    pressOperator("+");
    pressDigits(["123"]);
    calculate();
    isEqualValueFromDisplay("369");
    allClear();
  });
});