
import type { Product } from "./product.js";


export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";


export type DeliveryMethod = "courier" | "post_locker" | "store_pickup";


export interface CartItem {
  product: Product;
  quantity: number;
}


export type TimestampMetadata = {
  readonly createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  readonly orderId: string;
  customerEmail: string;
  items: CartItem[];
  status: OrderStatus;
  delivery: DeliveryMethod;
} & TimestampMetadata;


export const TERMINAL_STATUSES: ReadonlySet<OrderStatus> = new Set([
  "cancelled",
  "delivered",
]);
