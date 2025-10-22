import { Student } from './../../../../../domain/src/entities/Student';
import { StudentModel } from "../../infrastructure/database/models/Student";
import { BeltLevel } from '../../../../../domain/src/entities/BeltLevel';

export class StudentRepository {
  async getAll(): Promise<Student[]> {
    const docs = await StudentModel.find();
    return docs.map((doc) => this.toDomain(doc));
  }

 async create(data: Partial<Student>): Promise<Student> {
  if (data.belt) data.belt = (data.belt as string).toUpperCase() as BeltLevel; // normaliza
  const newStudent = new StudentModel(data);
  const saved = await newStudent.save();
  return this.toDomain(saved);
}

  async findById(id: string): Promise<Student | null> {
    const doc = await StudentModel.findById(id);
    return doc ? this.toDomain(doc) : null;
  }

  async update(id: string, data: Partial<Student>): Promise<Student | null> {
    const doc = await StudentModel.findByIdAndUpdate(id, data, { new: true });
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await StudentModel.findByIdAndDelete(id);
  }

  private toDomain(doc: any): Student {
    const belt = (doc.belt as string).toUpperCase() as BeltLevel;
    return new Student(
      doc._id.toString(),
      doc.userId,
      doc.birthDate,
      belt,
      doc.phone
    );
  }
}
