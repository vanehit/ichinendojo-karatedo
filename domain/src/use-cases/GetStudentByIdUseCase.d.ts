import type { Student } from "../entities/index.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";
export declare class GetStudentByIdUseCase {
    private studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(id: string): Promise<Student | null>;
}
