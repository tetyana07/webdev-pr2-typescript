

import type { CartItem } from "./types/order.js";
import type { Order } from "./types/order.js";
import type { PaymentDetails } from "./types/payment.js";

import { createProduct, calculateLineTotal } from "./services/catalog.js";
import { updateOrderStatus } from "./services/order.js";
import { validateCustomerInput } from "./services/validation.js";
import { maskCardNumber, processPayment } from "./services/payment.js";

function line(): void {
  console.log("-".repeat(50));
}

console.log("=== СИСТЕМА ОБРОБКИ ЗАМОВЛЕНЬ (E-COMMERCE CORE) ===\n");


console.log("[Каталог товарів]");

const laptop = createProduct({
  title: "Ноутбук Pro 16",
  price: 45000,
  tags: ["ноутбук", "apple", "флагман"],
  inStock: true,
  warrantyMonths: 24,
  powerWatts: 140,
  specs: ["M3 Max", 36],
});

const mouse = createProduct({
  title: "Бездротова миша",
  price: 1200,
  tags: ["аксесуар", "миша"],
  inStock: true,
  warrantyMonths: 12,
  specs: ["-", 0],
});

console.log(
  `- Створено товар #${laptop.id}: [${laptop.title}] - ${laptop.price} грн (В наявності: ${
    laptop.inStock ? "так" : "ні"
  })`,
);
console.log(
  `  Специфікації: CPU: ${laptop.specs[0]}, RAM: ${laptop.specs[1]}GB, Гарантія: ${laptop.warrantyMonths} міс.`,
);
console.log(
  `- Створено товар #${mouse.id}: [${mouse.title}] - ${mouse.price} грн (В наявності: ${
    mouse.inStock ? "так" : "ні"
  })\n`,
);


console.log("[Формування кошика]");

const cartItems: CartItem[] = [
  { product: laptop, quantity: 1 },
  { product: mouse, quantity: 2 },
];

let orderTotal = 0;
cartItems.forEach((item, index) => {
  const lineTotal = calculateLineTotal(item.product.price, item.quantity);
  orderTotal += lineTotal;
  console.log(`${index + 1}. ${item.product.title} x ${item.quantity} = ${lineTotal} грн`);
});

console.log(`\nЗагальна вартість замовлення: ${orderTotal} грн\n`);


console.log("[Створення замовлення]");

const customerEmail = validateCustomerInput("customer@example.com");

let order: Order = {
  orderId: "ord-98214-abc",
  customerEmail,
  items: cartItems,
  status: "pending",
  delivery: "courier",
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log(`Замовлення ID: ${order.orderId}`);
console.log(`Клієнт: ${order.customerEmail}`);
console.log(`Доставка: ${order.delivery}`);
console.log(`Початковий статус: ${order.status}`);
console.log(`Час створення: ${order.createdAt.toISOString()}\n`);


console.log("[Зміна життєвого циклу]");

order = updateOrderStatus(order, "processing");
console.log(`Оновлення статусу: pending -> processing (Оновлено: ${order.updatedAt.toISOString()})`);

order = updateOrderStatus(order, "shipped");
console.log(`Оновлення статусу: processing -> shipped (Оновлено: ${order.updatedAt.toISOString()})\n`);


console.log("[Процесинг платежу]");

const cardPayment: PaymentDetails = {
  type: "card",
  cardNumber: "4111 1111 1111 8821",
  cardHolder: "John Doe",
  cvv: "123",
};

console.log(`Метод оплати: ${cardPayment.type}`);
console.log(`Маскування: ${maskCardNumber(cardPayment)}`);
console.log(`Результат: ${processPayment(cardPayment, orderTotal)}\n`);


line();
console.log("Додаткова демонстрація інших способів оплати:\n");

const cashPayment: PaymentDetails = { type: "cash", cashAmountToPay: 50000 };
console.log(`Метод оплати: ${cashPayment.type}`);
console.log(`Маскування: ${maskCardNumber(cashPayment)}`);
console.log(`Результат: ${processPayment(cashPayment, orderTotal)}\n`);

const onlinePayment: PaymentDetails = {
  type: "online_service",
  serviceName: "ApplePay",
  transactionRef: "txn-77219-xyz",
};
console.log(`Метод оплати: ${onlinePayment.type}`);
console.log(`Маскування: ${maskCardNumber(onlinePayment)}`);
console.log(`Результат: ${processPayment(onlinePayment, orderTotal)}\n`);


line();
console.log("Демонстрація обробки некоректних даних:\n");

try {
  calculateLineTotal(-100, 1);
} catch (error) {
  console.log(`Очікувана помилка (від'ємна ціна): ${(error as Error).message}`);
}

try {
  updateOrderStatus({ ...order, status: "delivered" }, "pending");
} catch (error) {
  console.log(`Очікувана помилка (перехід з кінцевого статусу): ${(error as Error).message}`);
}

try {
  validateCustomerInput(12345);
} catch (error) {
  console.log(`Очікувана помилка (некоректний тип): ${(error as Error).message}`);
}
