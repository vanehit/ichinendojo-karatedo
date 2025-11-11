import type { IStudentRepository } from "../repositories/IStudentRepository.js";
export declare class DeleteStudentUseCase {
    private studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(id: string): Promise<void>;
}
