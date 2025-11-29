import { RegisterUserUseCase } from "../users/RegisterUserUseCase.js";
import { RegisterTeacherUseCase } from "./RegisterTeacherUseCase.js";

interface RegisterTeacherFullDTO {
  name: string;
  email: string;
  password: string;
  belt?: string;
  phone?: string;
  photo?: string;
}

export class RegisterTeacherFullProcessUseCase {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly registerTeacher: RegisterTeacherUseCase
  ) {}

  async execute(data: RegisterTeacherFullDTO) {
    const user = await this.registerUser.execute({
      name: data.name,
      email: data.email,
      password: data.password,
      role: "TEACHER",
    });

    const teacher = await this.registerTeacher.execute({
      userId: user.id,
      name: data.name,
      email: data.email,
      belt: data.belt,
      phone: data.phone,
      photo: data.photo,
    });

    return { user, teacher };
  }
}
