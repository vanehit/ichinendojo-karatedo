import { Student } from "../entities/Student.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";
import type { BeltLevel } from "../entities/BeltLevel.js";
import { randomUUID } from "crypto";


export class RegisterStudentUseCase {
  constructor(private studentRepo: IStudentRepository) {}

  async execute(data: {
    name: string;
    email: string;
    birthDate: string;
    userId: string;
    belt?: BeltLevel;
    phone?: string;
  }): Promise<Student> {
    const student = new Student(
      randomUUID(),           
      data.name,                     
      data.email,                    
      data.userId,                   
      new Date(data.birthDate),      
      data.belt ?? "WHITE",         
      data.phone                     
    );

    return this.studentRepo.create(student);
  }
}
