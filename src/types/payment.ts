/**
 * Рівень 3. Способи оплати через розпізнавані об'єднання (Discriminated Unions).
 * Спільний дискримінатор — поле "type".
 */

export interface CreditCardPayment {
  type: "card";
  cardNumber: string;
  cardHolder: string;
  cvv: string;
}

export interface CashOnDeliveryPayment {
  type: "cash";
  cashAmountToPay: number;
}

export interface OnlineServicePayment {
  type: "online_service";
  serviceName: "ApplePay" | "GooglePay";
  transactionRef: string;
}

/** Юніон усіх підтримуваних способів оплати. */
export type PaymentDetails =
  | CreditCardPayment
  | CashOnDeliveryPayment
  | OnlineServicePayment;
