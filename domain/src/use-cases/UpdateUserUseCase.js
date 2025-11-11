export class UpdateUserUseCase {
    userRepository;
    passwordHasher;
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        if (data.name)
            user.name = data.name.trim();
        if (data.email)
            user.email = data.email.toLowerCase();
        if (data.role) {
            const validRoles = ["ADMIN", "TEACHER", "STUDENT", "USER"];
            if (!validRoles.includes(data.role))
                throw new Error(`Invalid role: ${data.role}`);
            user.role = data.role;
        }
        if (data.password) {
            const passwordHash = await this.passwordHasher.hash(data.password);
            user.setPassword(passwordHash);
        }
        const updated = await this.userRepository.update(id, user);
        if (!updated)
            throw new Error("Error updating user");
        return updated;
    }
}
