import type { IClassRepository } from "../../repositories/IClassRepository.js";
export declare class GetClassesByTeacherUseCase {
    private classRepo;
    constructor(classRepo: IClassRepository);
    execute(teacherId: string): Promise<import("../../entities/index.js").Class[]>;
}
