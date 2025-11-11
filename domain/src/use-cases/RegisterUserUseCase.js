import { randomUUID } from "crypto";
import { User } from "../entities/users/User.js";
export class RegisterUserUseCase {
    userRepo;
    passwordHasher;
    constructor(userRepo, passwordHasher) {
        this.userRepo = userRepo;
        this.passwordHasher = passwordHasher;
    }
    async execute(data) {
        if (!data.name || !data.email || !data.password) {
            throw new Error("Missing required fields");
        }
        const existing = await this.userRepo.findByEmail(data.email.toLowerCase());
        if (existing)
            throw new Error("Email already registered");
        const totalUsers = await this.userRepo.count();
        let userRole;
        if (totalUsers === 0) {
            userRole = "ADMIN";
        }
        else {
            // requiere rol
            if (!data.role)
                throw new Error("Role is required for new users (except the first admin)");
            userRole = data.role;
        }
        const passwordHash = await this.passwordHasher.hash(data.password);
        const user = new User(randomUUID(), data.name.trim(), data.email.toLowerCase(), passwordHash, userRole);
        return this.userRepo.create(user);
    }
}
