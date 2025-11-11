export class GetMyClassesUseCase {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async execute(teacherId) {
        const classes = await this.classRepo.getByTeacher(teacherId);
        return classes.map((c) => c.toPrimitives());
    }
}
