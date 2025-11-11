export class DeleteClassUseCase {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async execute(id) {
        return await this.classRepo.delete(id);
    }
}
