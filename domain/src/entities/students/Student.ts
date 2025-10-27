// src/domain/entities/students/Student.ts
export class Student {
  public createdAt: Date;
  public birthDate: Date;

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public userId: string,
    birthDate: Date | string,
    public belt: string = "WHITE", // default simple string
    public phone?: string
  ) {
    const parsedDate = new Date(birthDate);
    this.validateBirthDate(parsedDate);
    this.birthDate = parsedDate;
    this.createdAt = new Date();
  }

  private validateBirthDate(birthDate: Date): void {
    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
      throw new Error("Invalid birth date");
    }
  }
}
