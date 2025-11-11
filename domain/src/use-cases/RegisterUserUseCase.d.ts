import type { IUserRepository } from "../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../services/IPasswordHasher.js";
import { User, type UserRole } from "../entities/users/User.js";
export declare class RegisterUserUseCase {
    private readonly userRepo;
    private readonly passwordHasher;
    constructor(userRepo: IUserRepository, passwordHasher: IPasswordHasher);
    execute(data: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<User>;
}
