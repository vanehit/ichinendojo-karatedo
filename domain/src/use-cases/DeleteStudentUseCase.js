export class DeleteStudentUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute(id) {
        await this.studentRepository.delete(id);
    }
}
