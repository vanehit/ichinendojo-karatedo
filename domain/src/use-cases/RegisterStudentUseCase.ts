import { type BeltLevel } from "../entities/BeltLevel.js";
import { Student } from "../entities/Student.js";


export class RegisterStudentUseCase {
  execute(data: {
    id: string;
    userId: string;
    birthDate: Date;
    belt?: BeltLevel;
    phone?: string;
  }): Student {
    const belt = data.belt || "WHITE"; //Default belt
    return new Student(data.id, data.userId, data.birthDate, belt, data.phone);
  }
}
