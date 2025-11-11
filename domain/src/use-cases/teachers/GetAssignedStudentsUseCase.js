export class GetAssignedStudentsUseCase {
    studentRepo;
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    async execute(teacherId) {
        const students = await this.studentRepo.getByTeacher(teacherId);
        return students.map((s) => s.toPrimitives());
    }
}
