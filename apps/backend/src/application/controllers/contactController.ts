import type { Request, Response } from "express";
import { MongoContactMessageRepository } from "../../infrastructure/repositories/MongoContactMessageRepository.js";
import { SendContactMessageUseCase } from "../../../../../domain/dist/use-cases/SendContactMessageUseCase.js";

const repository = new MongoContactMessageRepository();
const sendContactMessageUseCase = new SendContactMessageUseCase(repository);

export const contactController = {
  async sendMessage(req: Request, res: Response) {
    try {
      const { name, email, message } = req.body;
      const newMessage = await sendContactMessageUseCase.execute(name, email, message);
      res.status(201).json({ success: true, data: newMessage });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

 async listMessages(req: Request, res: Response) { 
  const messages = await repository.getAllMessages();
  res.json({ success: true, data: messages });
}
};
