export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    private _quantity: number = 0
  ) {}

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    if (value < 0) {
      throw new Error('Quantity cannot be negative');
    }
    this._quantity = value;
  }
}
