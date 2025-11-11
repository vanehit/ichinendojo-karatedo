export class GetStudentByIdUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute(id) {
        return this.studentRepository.findById(id);
    }
}
