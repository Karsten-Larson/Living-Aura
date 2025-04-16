import { Product } from "./Product";

export class CartItem {
  private _quantity: number = 0;

  constructor(quantity: number, public product: Product) {
    this.quantity = quantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    if (value < 1) {
      throw new Error('Quantity cannot be zero or negative');
    }

    this._quantity = value;
  }
}
