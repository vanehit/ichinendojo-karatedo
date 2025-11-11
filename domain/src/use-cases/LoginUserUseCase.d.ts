import type { User } from "../entities/index.js";
import type { IUserRepository } from "../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../services/IPasswordHasher.js";
import type { ITokenGenerator } from "../services/ITokenGenerator.js";
export declare class LoginUserUseCase {
    private readonly userRepo;
    private readonly passwordHasher;
    private readonly tokenGenerator;
    constructor(userRepo: IUserRepository, passwordHasher: IPasswordHasher, tokenGenerator: ITokenGenerator);
    execute(email: string, password: string): Promise<{
        token: string;
        user: User;
    }>;
}
