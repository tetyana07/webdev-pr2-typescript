import type { CreateProductInput, Product } from "../types/product.js";

let nextProductId = 1;

export function createProduct(productData: CreateProductInput): Product {
  if (productData.price < 0) {
    throw new Error("Ціна товару не може бути від'ємною.");
  }

  const product: Product = {
    id: nextProductId++,
    ...productData,
  };

  return product;
}


export function calculateLineTotal(
  price: number,
  quantity: number,
  discountPercent: number = 0,
): number {
  if (price < 0) {
    throw new Error("Ціна не може бути від'ємною.");
  }
  if (quantity < 0) {
    throw new Error("Кількість не може бути від'ємною.");
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Відсоток знижки має бути у діапазоні від 0 до 100.");
  }

  const rawTotal = price * quantity;
  const discountMultiplier = 1 - discountPercent / 100;

  return Math.round(rawTotal * discountMultiplier * 100) / 100;
}
