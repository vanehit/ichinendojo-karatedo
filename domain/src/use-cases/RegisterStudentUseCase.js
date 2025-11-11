import { randomUUID } from "crypto";
import { Student } from "../entities/students/Student.js";
export class RegisterStudentUseCase {
    studentRepo;
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    async execute(data) {
        if (!data.name || !data.email || !data.userId || !data.birthDate) {
            throw new Error("Missing required fields");
        }
        const student = new Student(randomUUID(), data.name.trim(), data.email.toLowerCase(), data.userId, data.birthDate, data.belt ?? "WHITE", data.phone ?? "", data.photo ?? null);
        return this.studentRepo.create(student);
    }
}
