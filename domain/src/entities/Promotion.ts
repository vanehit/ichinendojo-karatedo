export class Promotion {
  public approved: boolean = false;
  public createdAt?: Date;

  constructor(
    public studentId: string,
    public oldBelt: string,
    public newBelt: string,
    public examDate: Date
  ) {}

  
  approve() {
    this.approved = true;
  }
}
