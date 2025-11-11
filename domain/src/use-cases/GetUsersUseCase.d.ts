import type { IUserRepository } from "../repositories/IUserRepository.js";
import type { User } from "../entities/users/User.js";
export declare class GetUsersUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(): Promise<User[]>;
}
