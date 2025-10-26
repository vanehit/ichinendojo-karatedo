import { Student } from "../entities/Student.js";

export class GetPromotionsUseCase {
  execute(student: Student) {
    return student.promotions;
  }
}
