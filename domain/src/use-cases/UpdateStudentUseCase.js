export class UpdateStudentUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute(student) {
        return this.studentRepository.update(student);
    }
}
