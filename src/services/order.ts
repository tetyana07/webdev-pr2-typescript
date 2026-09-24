/**
 * Рівень 2. Операції зі зміною стану замовлення.
 */

import type { Order, OrderStatus } from "../types/order.js";
import { TERMINAL_STATUSES } from "../types/order.js";

/**
 * Чиста функція оновлення статусу замовлення.
 * Повертає НОВИЙ незмінний об'єкт замовлення (не мутує вхідний),
 * з оновленим полем status та актуалізованим updatedAt.
 *
 * Перехід зі статусів 'cancelled' або 'delivered' у будь-який інший заборонений.
 */
export function updateOrderStatus(order: Order, newStatus: OrderStatus): Order {
  if (TERMINAL_STATUSES.has(order.status)) {
    throw new Error(
      `Неможливо змінити статус замовлення: поточний статус "${order.status}" є кінцевим.`,
    );
  }

  return {
    ...order,
    status: newStatus,
    updatedAt: new Date(),
  };
}
