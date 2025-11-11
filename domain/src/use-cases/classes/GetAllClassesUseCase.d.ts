import type { IClassRepository } from "../../repositories/IClassRepository.js";
export declare class GetAllClassesUseCase {
    private classRepo;
    constructor(classRepo: IClassRepository);
    execute(): Promise<import("../../entities/index.js").Class[]>;
}
