export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public role: UserRole;
  public readonly createdAt: Date;
  private _passwordHash: string;

  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    role: UserRole = "STUDENT"
  ) {
    const validRoles: UserRole[] = ["ADMIN", "TEACHER", "STUDENT"];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date();
    this._passwordHash = passwordHash;
  }

  get password(): string {
    return this._passwordHash;
  }

  setPassword(passwordHash: string): void {
    this._passwordHash = passwordHash;
  }
 
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  }
}
