export class Student {
  public createdAt: Date;
  public birthDate: Date;

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public userId: string,
    birthDate: Date | string,
    public belt: string = "WHITE", 
    public phone?: string,
     public photo?: string | null
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

   // ✅ Método para devolver solo los datos públicos
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
      createdAt: this.createdAt,
    };
  }
}
