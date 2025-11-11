import type { IClassRepository } from "../../repositories/IClassRepository.js";
import { Class } from "../../entities/classes/Class.js";
interface CreateClassDTO {
    teacherId: string;
    students: string[];
    date: Date;
    topic: string;
    description?: string;
}
export declare class CreateClassUseCase {
    private classRepo;
    constructor(classRepo: IClassRepository);
    execute(data: CreateClassDTO): Promise<Class>;
}
export {};
