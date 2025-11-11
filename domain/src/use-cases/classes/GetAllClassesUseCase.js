export class GetAllClassesUseCase {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async execute() {
        return await this.classRepo.getAll();
    }
}
