/**
 * Рівень 1. Базові типи та інтерфейси предметної області товару.
 * Варіант 1: Електроніка та гаджети.
 */

// Ідентифікатор сутності може бути як рядком (UUID), так і числом (autoincrement).
export type EntityId = string | number;

/**
 * Базовий інтерфейс товару, спільний для будь-якої категорії каталогу.
 */
export interface BaseProduct {
  readonly id: EntityId;
  title: string;
  price: number;
  description?: string;
  tags: string[];
  inStock: boolean;
}

/**
 * Кортеж технічних характеристик пристрою: [cpu, ramGb].
 * Порядок елементів фіксований і має семантичне значення.
 */
export type DeviceSpecs = [cpu: string, ramGb: number];

/**
 * Специфічний товар категорії "Електроніка та гаджети" (Варіант 1),
 * що розширює базову сутність товару.
 */
export interface Product extends BaseProduct {
  warrantyMonths: number;
  powerWatts?: number;
  specs: DeviceSpecs;
}

/**
 * Вхідні дані для створення товару — усі поля, окрім id (генерується системою).
 */
export type CreateProductInput = Omit<Product, "id">;
