import { Student } from "../../../../../domain/dist/entities/students/Student.js";
import type { IStudentRepository } from "../../../../../domain/dist/repositories/IStudentRepository.js";
import { StudentModel, type IStudent } from "../database/models/Student.js";

export class MongoStudentRepository implements IStudentRepository {
  private toDomain(doc: IStudent): Student {
    return new Student(
      doc._id.toString(),
      doc.name,
      doc.email,
      doc.userId,
      new Date(doc.birthDate),
      doc.belt || "WHITE",
      doc.phone
    );
  }

  async create(student: Student): Promise<Student> {
    const saved = await new StudentModel({
      _id: student.id,
      name: student.name,
      email: student.email,
      userId: student.userId,
      birthDate: student.birthDate,
      belt: student.belt,
      phone: student.phone,
      createdAt: student.createdAt,
    }).save();

    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Student | null> {
    const doc = await StudentModel.findById(id);
    return doc ? this.toDomain(doc) : null;
  }

  async getAll(): Promise<Student[]> {
    const docs = await StudentModel.find();
    return docs.map(this.toDomain);
  }

  async update(student: Student): Promise<Student> {
    const updated = await StudentModel.findByIdAndUpdate(
      student.id,
      {
        name: student.name,
        email: student.email,
        userId: student.userId,
        birthDate: student.birthDate,
        belt: student.belt,
        phone: student.phone,
      },
      { new: true }
    );

    if (!updated) throw new Error(`Student with id ${student.id} not found`);
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    const deleted = await StudentModel.findByIdAndDelete(id);
    if (!deleted) throw new Error(`Student with id ${id} not found`);
  }
}
