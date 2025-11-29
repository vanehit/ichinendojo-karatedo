import { ContactMessage } from "../entities/contact/ContactMessage.js";
import type { IContactMessageRepository } from "../repositories/IContactMessageRepository.js";

export class SendContactMessageUseCase {
  constructor(private messageRepository: IContactMessageRepository) {}

  async execute(name: string, email: string, message: string): Promise<void> {
    const newMessage = new ContactMessage(name, email, message);
    await this.messageRepository.saveMessage(newMessage);
  }
}
