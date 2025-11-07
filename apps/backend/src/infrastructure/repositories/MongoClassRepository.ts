import { Class } from "../../../../../domain/dist/entities/classes/Class.js";
import { ClassModel } from "../database/models/Class.js";
import type { IClassRepository } from "../../../../../domain/dist/repositories/IClassRepository.js";

export class MongoClassRepository implements IClassRepository {
  private toDomain(raw: any): Class {
    return new Class({
      _id: raw._id?.toString(),
      teacherId: raw.teacherId,
      students: raw.students || [],
      date: raw.date,
      topic: raw.topic,
      description: raw.description,
      attendance: raw.attendance || [],
    });
  }

  async create(c: Class): Promise<Class> {
    const doc = new ClassModel(c.toPrimitives());
    await doc.save();
    return this.toDomain(doc.toObject());
  }

  async findById(id: string): Promise<Class | null> {
    const doc = await ClassModel.findById(id).lean();
    return doc ? this.toDomain(doc) : null;
  }

  async getByTeacher(teacherId: string): Promise<Class[]> {
    const docs = await ClassModel.find({ teacherId }).lean();
    return docs.map((d) => this.toDomain(d));
  }

  async getByStudent(studentId: string): Promise<Class[]> {
    const docs = await ClassModel.find({ students: studentId }).lean();
    return docs.map((d) => this.toDomain(d));
  }

  async getAll(): Promise<Class[]> {
    const docs = await ClassModel.find().lean();
    return docs.map((d) => this.toDomain(d));
  }

  async update(c: Class): Promise<Class> {
    await ClassModel.findByIdAndUpdate(c.toPrimitives()._id, c.toPrimitives());
    return c;
  }

  async delete(id: string): Promise<void> {
    await ClassModel.findByIdAndDelete(id);
  }
}
