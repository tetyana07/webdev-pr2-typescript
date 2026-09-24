import type { Order, OrderStatus } from "../types/order.js";
import { TERMINAL_STATUSES } from "../types/order.js";

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
