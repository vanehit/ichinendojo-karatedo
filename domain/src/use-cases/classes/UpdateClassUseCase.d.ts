import type { IClassRepository } from "../../repositories/IClassRepository.js";
import { Class } from "../../entities/classes/Class.js";
interface UpdateClassDTO {
    id: string;
    teacherId: string;
    students: string[];
    date: Date;
    topic: string;
    description?: string;
    attendance?: string[];
}
export declare class UpdateClassUseCase {
    private classRepo;
    constructor(classRepo: IClassRepository);
    execute(data: UpdateClassDTO): Promise<Class>;
}
export {};
