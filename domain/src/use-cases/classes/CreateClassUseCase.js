import { Class } from "../../entities/classes/Class.js";
export class CreateClassUseCase {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async execute(data) {
        const newClass = new Class({
            ...data,
            attendance: [],
        });
        return await this.classRepo.create(newClass);
    }
}
