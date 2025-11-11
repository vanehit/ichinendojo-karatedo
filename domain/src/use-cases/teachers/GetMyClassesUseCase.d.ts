import type { IClassRepository } from "../../repositories/IClassRepository.js";
export declare class GetMyClassesUseCase {
    private readonly classRepo;
    constructor(classRepo: IClassRepository);
    execute(teacherId: string): Promise<import("../../entities/index.js").ClassPrimitives[]>;
}
