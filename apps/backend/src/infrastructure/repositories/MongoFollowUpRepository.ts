import { FollowUp } from "../../../../../domain/dist/entities/students/FollowUp.js";
import { FollowUpModel } from "../database/models/FollowUp.js";

export class MongoFollowUpRepository {
  async create(data: FollowUp) {
    const doc = new FollowUpModel(data.toPrimitives());
    await doc.save();
    return data;
  }

  async getByStudent(studentId: string) {
    const docs = await FollowUpModel.find({ studentId }).lean();
    return docs.map((d) => new FollowUp(d));
  }

  async getByTeacher(teacherId: string) {
    const docs = await FollowUpModel.find({ teacherId }).lean();
    return docs.map((d) => new FollowUp(d));
  }
}
