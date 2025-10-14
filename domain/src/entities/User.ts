export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export class User {
  public createdAt: Date;

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: UserRole,
    public passwordHash: string = ""
  ) {
    
    const validRoles: UserRole[] = ["ADMIN", "TEACHER", "STUDENT"];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
    this.createdAt = new Date();
  }
}
