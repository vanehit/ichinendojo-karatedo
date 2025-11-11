export class GetStudentsUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute() {
        return this.studentRepository.getAll();
    }
}
