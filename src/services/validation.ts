
export function validateCustomerInput(input: unknown): string {
  if (typeof input !== "string") {
    throw new TypeError("Некоректний тип вхідних даних: очікувався рядок (string).");
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    throw new Error("Вхідний рядок не може бути порожнім.");
  }

  if (!trimmed.includes("@")) {
    throw new Error('Некоректний формат email: відсутній символ "@".');
  }

  return trimmed;
}
