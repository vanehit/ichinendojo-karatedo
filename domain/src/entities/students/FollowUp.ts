export interface FollowUpPrimitives {
  _id: string;
  teacherId: string;
  studentId: string;
  comment: string;
  progress: string; // ej: "Excelente", "Regular", "Falta mejorar"
  date: Date;
}

export class FollowUp {
  constructor(private readonly props: FollowUpPrimitives) {}

  toPrimitives() {
    return this.props;
  }

  static create(data: Omit<FollowUpPrimitives, "_id">) {
    return new FollowUp({ _id: crypto.randomUUID(), ...data });
  }
}
