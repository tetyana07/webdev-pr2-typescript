/**
 * Рівень 2. Типи життєвого циклу замовлення.
 */

import type { Product } from "./product.js";

/** Літеральний тип (string literal union) статусів замовлення. */
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Способи доставки замовлення (Варіант 1: Електроніка та гаджети):
 * кур'єром, у поштомат або самовивіз з магазину.
 */
export type DeliveryMethod = "courier" | "post_locker" | "store_pickup";

/** Позиція кошика покупок. */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Аудит-мітки часу створення/оновлення сутності. */
export type TimestampMetadata = {
  readonly createdAt: Date;
  updatedAt: Date;
};

/**
 * Повна модель замовлення: об'єднання власних полів замовлення
 * та аудит-міток через перетин типів (intersection).
 */
export type Order = {
  readonly orderId: string;
  customerEmail: string;
  items: CartItem[];
  status: OrderStatus;
  delivery: DeliveryMethod;
} & TimestampMetadata;

/** Статуси, з яких заборонено будь-який подальший перехід. */
export const TERMINAL_STATUSES: ReadonlySet<OrderStatus> = new Set([
  "cancelled",
  "delivered",
]);
