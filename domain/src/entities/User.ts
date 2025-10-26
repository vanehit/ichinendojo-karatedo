export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export class User {
  public createdAt: Date;
  private _passwordHash: string;

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: UserRole = "STUDENT"
  ) {
    const validRoles: UserRole[] = ["ADMIN", "TEACHER", "STUDENT"];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }

    this.createdAt = new Date();
    this._passwordHash = passwordHash;
  }

  get password(): string {
    return this._passwordHash;
  }

  setPassword(passwordHash: string) {
    this._passwordHash = passwordHash;
  }
}
