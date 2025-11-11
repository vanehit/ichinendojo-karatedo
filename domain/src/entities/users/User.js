export class User {
    id;
    name;
    email;
    role;
    createdAt;
    _passwordHash;
    constructor(id, name, email, passwordHash, role = "USER") {
        const validRoles = ["ADMIN", "TEACHER", "STUDENT", "USER"];
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
    get passwordHash() {
        return this._passwordHash;
    }
    get password() {
        return this._passwordHash;
    }
    setPassword(passwordHash) {
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
