import type { IUserRepository } from "../repositories/IUserRepository.js";
export declare class DeleteUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<void>;
}
