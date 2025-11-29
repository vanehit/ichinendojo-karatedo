import { RegisterUserUseCase } from "../users/RegisterUserUseCase.js";
import { RegisterStudentUseCase } from "./RegisterStudentUseCase.js";

interface RegisterStudentFullDTO {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  belt?: string;
  phone?: string;
  photo?: string;
}

export class RegisterStudentFullProcessUseCase {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly registerStudent: RegisterStudentUseCase
  ) {}

  async execute(data: RegisterStudentFullDTO) {
    // 1️⃣ Crear usuario
    const user = await this.registerUser.execute({
      name: data.name,
      email: data.email,
      password: data.password,
      role: "STUDENT",
    });

    // 2️⃣ Crear alumno vinculado al userId
    const student = await this.registerStudent.execute({
      userId: user.id,
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      belt: data.belt,
      phone: data.phone,
      photo: data.photo,
    });

    // 3️⃣ Respuesta unificada
    return {
      user,
      student,
    };
  }
}
