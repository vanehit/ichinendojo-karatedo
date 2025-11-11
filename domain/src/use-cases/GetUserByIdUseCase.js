export class GetUserByIdUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        if (!id)
            throw new Error("User ID is required");
        return this.userRepository.findById(id);
    }
}
