import type { Student } from "../entities/index.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";
export declare class GetStudentsUseCase {
    private studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(): Promise<Student[]>;
}
