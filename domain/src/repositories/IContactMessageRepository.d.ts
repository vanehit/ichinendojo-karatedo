import { ContactMessage } from "../entities/contact/ContactMessage.js";
export interface IContactMessageRepository {
    saveMessage(message: ContactMessage): Promise<void>;
    getAllMessages(): Promise<ContactMessage[]>;
}
