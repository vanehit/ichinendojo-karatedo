import { Student } from "../../../../../domain/src/entities/students/Student.js";
import type { IStudentRepository } from "../../../../../domain/src/repositories/IStudentRepository.js";
import { StudentModel, type IStudent } from "../database/models/Student.js";
import type { BeltLevel } from "../../../../../domain/src/entities/BeltLevel.js";

export class MongoStudentRepository implements IStudentRepository {
  private toDomain(doc: IStudent): Student {
    const beltLevels: BeltLevel[] = [
      "WHITE",
      "LIGHTBLUE",
      "YELLOW",
      "ORANGE",
      "GREEN",
      "BLUE",
      "BROWN",
      "BLACK",
    ];

    const belt = beltLevels.includes(doc.belt) ? doc.belt : "WHITE";

    return new Student(
      doc._id.toString(),
      doc.name,
      doc.email,
      doc.userId,
      new Date(doc.birthDate),
      belt,
      doc.phone ?? undefined
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
    return docs.map((d) => this.toDomain(d));
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

    if (!updated) throw new Error("Student not found");
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await StudentModel.findByIdAndDelete(id);
  }
}
