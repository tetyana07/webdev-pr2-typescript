
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

export type PaymentDetails =
  | CreditCardPayment
  | CashOnDeliveryPayment
  | OnlineServicePayment;
