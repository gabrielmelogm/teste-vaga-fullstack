function validateCpf(cpf: string): boolean {
  if (cpf.length < 11) {
    throw new Error("Format is invalid");
  }
  const digits = cpf.split("").map((d) => Number.parseInt(d));
  const restDigits = digits.slice(0, 9);
  const verifyDigits = digits.slice(-2);

  const verifyFirstDigit = calcFirstVerifyDigit(restDigits);

  let valid: boolean = true;

  if (verifyFirstDigit !== verifyDigits[0]) {
    valid = false;
  }
  const verifySecondDigit = calcSecondVerifyDigit(restDigits, verifyFirstDigit);

  if (verifySecondDigit !== verifyDigits[1]) {
    valid = false;
  }

  return valid;
}

function calcFirstVerifyDigit(digits: number[]): number {
  const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstCalcDigits = [];

  for (let count = 1; count <= 9; count++) {
    const firstNumber = digits[count - 1];
    const secondNumber = weights[count - 1];

    firstCalcDigits.push(firstNumber * secondNumber);
  }

  const sumFirsCalcDigits = firstCalcDigits.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const restDivision = sumFirsCalcDigits / 11;
  let restVerifyDigit = sumFirsCalcDigits - restDivision.toFixed(0) * 11;

  if (restVerifyDigit === 0 || restVerifyDigit === 1) {
    restVerifyDigit = 0;
  }

  if (restVerifyDigit >= 2) {
    restVerifyDigit = 11 - restVerifyDigit;
  }

  if (restVerifyDigit < 0) {
    restVerifyDigit = restVerifyDigit * -1;
  }
  return restVerifyDigit;
}

function calcSecondVerifyDigit(
  digits: number[],
  firstVerifyDigit: number,
): number {
  digits.push(firstVerifyDigit);
  const weights = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstCalcDigits = [];

  for (let count = 1; count <= 10; count++) {
    const firstNumber = digits[count - 1];
    const secondNumber = weights[count - 1];

    firstCalcDigits.push(firstNumber * secondNumber);
  }

  const sumFirsCalcDigits = firstCalcDigits.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const restDivision = sumFirsCalcDigits / 11;
  let restVerifyDigit = sumFirsCalcDigits - restDivision.toFixed(0) * 11;

  if (restVerifyDigit === 0 || restVerifyDigit === 1) {
    restVerifyDigit = 0;
  }

  if (restVerifyDigit >= 2) {
    restVerifyDigit = 11 - restVerifyDigit;
  }

  if (restVerifyDigit < 0) {
    restVerifyDigit = restVerifyDigit * -1;
  }

  return restVerifyDigit;
}

console.log(validateCpf("61348701374"));
