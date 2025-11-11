import type { IClassRepository } from "../../repositories/IClassRepository.js";
export declare class DeleteClassUseCase {
    private classRepo;
    constructor(classRepo: IClassRepository);
    execute(id: string): Promise<void>;
}
