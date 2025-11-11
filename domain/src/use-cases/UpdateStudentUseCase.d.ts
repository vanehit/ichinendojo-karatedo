import type { Student } from "../entities/index.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";
export declare class UpdateStudentUseCase {
    private studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(student: Student): Promise<Student>;
}
