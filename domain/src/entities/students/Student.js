export class Student {
    id;
    name;
    email;
    userId;
    belt;
    phone;
    photo;
    createdAt;
    birthDate;
    entryDate;
    constructor(id, name, email, userId, birthDate, belt = "WHITE", phone, photo, entryDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.belt = belt;
        this.phone = phone;
        this.photo = photo;
        const parsedBirthDate = new Date(birthDate);
        this.validateBirthDate(parsedBirthDate);
        this.birthDate = parsedBirthDate;
        this.entryDate = entryDate ? new Date(entryDate) : new Date();
        this.createdAt = new Date();
    }
    validateBirthDate(birthDate) {
        if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
            throw new Error("Invalid birth date");
        }
    }
    // Método para devolver solo los datos públicos
    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            userId: this.userId,
            birthDate: this.birthDate,
            belt: this.belt,
            phone: this.phone,
            photo: this.photo ?? "",
            entryDate: this.entryDate,
            createdAt: this.createdAt,
        };
    }
}
