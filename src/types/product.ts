
export type EntityId = string | number;

export interface BaseProduct {
  readonly id: EntityId;
  title: string;
  price: number;
  description?: string;
  tags: string[];
  inStock: boolean;
}


export type DeviceSpecs = [cpu: string, ramGb: number];

export interface Product extends BaseProduct {
  warrantyMonths: number;
  powerWatts?: number;
  specs: DeviceSpecs;
}

export type CreateProductInput = Omit<Product, "id">;
