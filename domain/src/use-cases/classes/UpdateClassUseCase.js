import { Class } from "../../entities/classes/Class.js";
export class UpdateClassUseCase {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async execute(data) {
        const updatedClass = new Class({
            ...data,
            _id: data.id,
        });
        return await this.classRepo.update(updatedClass);
    }
}
