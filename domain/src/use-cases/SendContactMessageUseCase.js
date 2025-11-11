import { ContactMessage } from "../entities/contact/ContactMessage.js";
export class SendContactMessageUseCase {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async execute(name, email, message) {
        const newMessage = new ContactMessage(name, email, message);
        await this.messageRepository.saveMessage(newMessage);
    }
}
