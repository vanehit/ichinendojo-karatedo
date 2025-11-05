import { ContactMessageModel } from "../database/models/ContactMessageModel.js";
import { ContactMessage } from "../../../../../domain/dist/entities/contact/ContactMessage.js";
import type { IContactMessageRepository } from "../../../../../domain/dist/repositories/IContactMessageRepository.js";

export class MongoContactMessageRepository implements IContactMessageRepository {
  async saveMessage(message: ContactMessage): Promise<void> {
    const doc = new ContactMessageModel({
      name: message.name,
      email: message.email,
      message: message.message,
      date: message.date ?? new Date(),
    });
    await doc.save();
  }

  async getAllMessages(): Promise<ContactMessage[]> {
    const docs = await ContactMessageModel.find().sort({ date: -1 });
    return docs.map(
      (d) => new ContactMessage(d.name, d.email, d.message, d.date)
    );
  }
}
