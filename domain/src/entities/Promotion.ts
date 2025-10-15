import { isValidBeltLevel, type BeltLevel} from "./BeltLevel.js";


export class Promotion {
  public approved: boolean;
  public createdAt: Date;

  constructor(
    public id: string,
    public studentId: string,
    public oldBelt: BeltLevel,
    public newBelt: BeltLevel,
    public examDate: Date,
    approved: boolean = false
  ) {
    this.validateBelt(oldBelt);
    this.validateBelt(newBelt);

    this.approved = approved;
    this.createdAt = new Date();
  }

 private validateBelt(belt: BeltLevel) {
    if (!isValidBeltLevel(belt)) {
      throw new Error(`Invalid belt level: ${belt}`);
    }
  }

  // Método para aprobar la promoción
  approve() {
    this.approved = true;
  }
}
