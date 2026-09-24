/**
 * Рівень 2. Безпечна обробка невідомих зовнішніх даних (type narrowing).
 */

/**
 * Валідує значення невідомого типу (payload з форми або JSON-запиту)
 * як email-рядок клієнта.
 *
 * Через звуження типу (typeof narrowing) перевіряється, що передано
 * непорожній рядок, а також базова коректність формату (наявність символу "@").
 * Якщо тип не є рядком — кидається виключення TypeError.
 */
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
