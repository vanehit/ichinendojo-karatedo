export interface ClassPrimitives {
   _id?: string;
  teacherId: string;
  students: string[]; 
  date: Date;
  topic: string;
  description?: string;
  attendance?: string[]; 
}

export class Class {
  constructor(private readonly props: ClassPrimitives) {}

  static create(data: Omit<ClassPrimitives, "_id">) {
    return new Class({
      _id: crypto.randomUUID(),
      ...data,
    });
  }

  toPrimitives() {
    return this.props;
  }
}
