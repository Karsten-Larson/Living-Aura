export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public email: string,
    private _password: string
  ) {}

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    this._password = value;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
