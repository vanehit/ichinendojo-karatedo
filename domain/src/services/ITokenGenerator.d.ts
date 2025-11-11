export interface ITokenGenerator {
    generate(payload: object, expiresIn?: string): string;
    verify(token: string): object | null;
}
