import { Student } from "../entities/students/Student.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";
export interface IRegisterStudent {
    name: string;
    email: string;
    userId: string;
    birthDate: Date;
    belt?: string;
    phone?: string;
    photo?: string;
}
export declare class RegisterStudentUseCase {
    private readonly studentRepo;
    constructor(studentRepo: IStudentRepository);
    execute(data: IRegisterStudent): Promise<Student>;
}
