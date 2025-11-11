import type { IStudentRepository } from "../../repositories/IStudentRepository.js";
export declare class GetAssignedStudentsUseCase {
    private readonly studentRepo;
    constructor(studentRepo: IStudentRepository);
    execute(teacherId: string): Promise<{
        id: string;
        name: string;
        email: string;
        userId: string;
        birthDate: Date;
        belt: string;
        phone: string | undefined;
        photo: string;
        entryDate: Date | undefined;
        createdAt: Date;
    }[]>;
}
