export class Teacher {
  public createdAt: Date;

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public userId: string,
    public belt: string = "BLACK",
    public phone?: string,
    public photo?: string | null
  ) {
    this.createdAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      userId: this.userId,
      belt: this.belt,
      phone: this.phone,
      photo: this.photo,
      createdAt: this.createdAt,
    };
  }
}
