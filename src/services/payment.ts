/**
 * Рівень 3. Custom Type Guard та процесинг оплати з вичерпною перевіркою.
 */

import type { CreditCardPayment, PaymentDetails } from "../types/payment.js";

/**
 * Користувацький захисник типу (Custom Type Guard).
 * Перевіряє значення поля-дискримінатора type === 'card'.
 */
export function isCreditCardPayment(
  payment: PaymentDetails,
): payment is CreditCardPayment {
  return payment.type === "card";
}

/**
 * Безпечне маскування номера банківської картки.
 * Для карток повертає рядок виду "**** **** **** 1234",
 * для інших способів оплати — інформаційне повідомлення.
 */
export function maskCardNumber(payment: PaymentDetails): string {
  if (isCreditCardPayment(payment)) {
    const digitsOnly = payment.cardNumber.replace(/\D/g, "");
    const lastFour = digitsOnly.slice(-4).padStart(4, "0");
    return `**** **** **** ${lastFour}`;
  }

  return "Не вимагає маскування";
}

/**
 * Виконує процесинг оплати залежно від конкретного способу (discriminated union).
 * Гілка default використовує тип never для вичерпної перевірки (exhaustiveness check):
 * якщо у PaymentDetails з'явиться новий варіант і його не буде оброблено тут,
 * компілятор видасть помилку типізації під час збірки.
 */
export function processPayment(payment: PaymentDetails, amount: number): string {
  switch (payment.type) {
    case "card": {
      return `Успішно списано ${amount} грн з картки платника ${payment.cardHolder}.`;
    }

    case "cash": {
      if (payment.cashAmountToPay > amount) {
        const change = payment.cashAmountToPay - amount;
        return `Очікується оплата готівкою ${amount} грн. Підготуйте решту: ${change} грн.`;
      }
      return `Оплата готівкою при отриманні: точна сума ${amount} грн.`;
    }

    case "online_service": {
      return `Успішна авторизація платежу на суму ${amount} грн через ${payment.serviceName} (реф.: ${payment.transactionRef}).`;
    }

    default: {
      const _exhaustiveCheck: never = payment;
      throw new Error(`Невідомий спосіб оплати: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }
}
