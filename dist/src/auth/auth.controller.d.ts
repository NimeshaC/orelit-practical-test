import { AuthService } from "./auth.service";
import { User } from "../../src/user/entities/user.entity";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export interface AuthenticatedRequest extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: AuthenticatedRequest): Promise<import("../utility/response.utill").ResponseData<any>>;
    signUp(body: CreateUserDto): Promise<any>;
}
