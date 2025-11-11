import type { IContactMessageRepository } from "../repositories/IContactMessageRepository.js";
export declare class SendContactMessageUseCase {
    private messageRepository;
    constructor(messageRepository: IContactMessageRepository);
    execute(name: string, email: string, message: string): Promise<void>;
}
