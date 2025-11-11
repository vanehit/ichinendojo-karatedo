export declare class Student {
    id: string;
    name: string;
    email: string;
    userId: string;
    belt: string;
    phone?: string | undefined;
    photo?: string | null | undefined;
    createdAt: Date;
    birthDate: Date;
    entryDate?: Date;
    constructor(id: string, name: string, email: string, userId: string, birthDate: Date | string, belt?: string, phone?: string | undefined, photo?: string | null | undefined, entryDate?: string | Date);
    private validateBirthDate;
    toPrimitives(): {
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
    };
}
