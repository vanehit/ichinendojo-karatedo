import type { IUserRepository } from "../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../services/IPasswordHasher.js";
import { User } from "../entities/users/User.js";
export declare class UpdateUserUseCase {
    private readonly userRepository;
    private readonly passwordHasher;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher);
    execute(id: string, data: Partial<User & {
        password?: string;
    }>): Promise<User>;
}
