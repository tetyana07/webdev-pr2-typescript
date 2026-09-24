
import type { CreditCardPayment, PaymentDetails } from "../types/payment.js";


export function isCreditCardPayment(
  payment: PaymentDetails,
): payment is CreditCardPayment {
  return payment.type === "card";
}


export function maskCardNumber(payment: PaymentDetails): string {
  if (isCreditCardPayment(payment)) {
    const digitsOnly = payment.cardNumber.replace(/\D/g, "");
    const lastFour = digitsOnly.slice(-4).padStart(4, "0");
    return `**** **** **** ${lastFour}`;
  }

  return "Не вимагає маскування";
}

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
