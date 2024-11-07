export function validateCnpj(cnpj: string): boolean {
  const digits = cnpj
    .replaceAll(".", "")
    .replace("-", "")
    .replace("/", "")
    .split("")
    .map((d) => Number.parseInt(d));
  let restDigits = digits.slice(0, 12);
	
	let valid: boolean = true

	restDigits.push(calcVerifyDigit(restDigits))
	restDigits.push(calcVerifyDigit(restDigits))

	const verifyCnpj = restDigits.join('')
	const trueDigits = digits.join('')

	if (verifyCnpj !== trueDigits) {
		valid = false
	}

  return valid;
}

function calcVerifyDigit(digits: number[]): number {
  const size = digits.length;

  let sum = 0;
  let multi = 9;

  for (let i = size - 1; i >= 0; i--) {
    sum += digits[i] * multi;

    multi--;
    multi = multi < 2 ? 9 : multi;
  }

  return sum % 11;
}

