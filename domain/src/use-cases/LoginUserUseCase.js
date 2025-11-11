export class LoginUserUseCase {
    userRepo;
    passwordHasher;
    tokenGenerator;
    constructor(userRepo, passwordHasher, tokenGenerator) {
        this.userRepo = userRepo;
        this.passwordHasher = passwordHasher;
        this.tokenGenerator = tokenGenerator;
    }
    async execute(email, password) {
        const user = await this.userRepo.findByEmail(email.toLowerCase());
        console.log("Found user:", user);
        if (!user)
            throw new Error("Invalid credentials");
        const valid = await this.passwordHasher.compare(password, user.password);
        if (!valid)
            throw new Error("Invalid credentials");
        const token = this.tokenGenerator.generate({ userId: user.id, role: user.role });
        console.log("LoginUserUseCase user value:", user);
        console.log("LoginUserUseCase token:", token);
        return { token, user };
    }
}
