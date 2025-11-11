export type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "USER";
export declare class User {
    readonly id: string;
    name: string;
    email: string;
    role: UserRole;
    readonly createdAt: Date;
    private _passwordHash;
    constructor(id: string, name: string, email: string, passwordHash: string, role?: UserRole);
    get passwordHash(): string;
    get password(): string;
    setPassword(passwordHash: string): void;
    toPrimitives(): {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        createdAt: Date;
    };
}
