export class GetClassesByTeacherUseCase {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async execute(teacherId) {
        return await this.classRepo.getByTeacher(teacherId);
    }
}
