import type { IUserRepository } from "../repositories/IUserRepository.js";
import type { User } from "../entities/users/User.js";
export declare class GetUserByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<User | null>;
}
