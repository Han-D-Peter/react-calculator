import {
  calculate,
  isNotZero,
  isOverMaxWordLength,
  mergeStrings,
} from "../utils";

export class Calculator {
  private display: string;
  private targetNumber: string;
  private constantNumber: string;
  private operatorContainer: "+" | "*" | "/" | "-" | "";

  constructor() {
    this.display = "";
    this.targetNumber = "0";
    this.constantNumber = "";
    this.operatorContainer = "";
  }

  pressNumber(num: string) {
    const target = this.operatorContainer
      ? this.constantNumber
      : this.targetNumber;
    const maxLengthExceeded = isOverMaxWordLength(target, 3);

    if (maxLengthExceeded) return;

    const number = isNotZero(Number(target))
      ? mergeStrings([target, num])
      : num;

    if (this.operatorContainer) {
      this.constantNumber = number;
    } else {
      this.targetNumber = number;
    }

    this.render();
  }

  pressOperator(operator: "+" | "*" | "/" | "-") {
    this.operatorContainer = operator;
    this.render();
  }

  calculate() {
    if (this.targetNumber && this.constantNumber && this.operatorContainer) {
      this.setResult(
        `${calculate[this.operatorContainer](
          Number(this.targetNumber),
          Number(this.constantNumber)
        )}`
      );
    }
  }

  render() {
    this.setDisplay(
      this.targetNumber + this.operatorContainer + this.constantNumber
    );
  }

  setDisplay(text: string) {
    this.display = text === "NaN" ? "오류" : text;
  }

  getDisplayValue() {
    return this.display;
  }

  setResult(text: string) {
    this.allClear();
    this.targetNumber = text;
    this.render();
  }

  getResult() {
    return this.targetNumber;
  }

  allClear() {
    this.targetNumber = "0";
    this.constantNumber = "";
    this.operatorContainer = "";
    this.setDisplay("0");
  }
}
