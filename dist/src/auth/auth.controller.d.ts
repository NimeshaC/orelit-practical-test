import { AuthService } from './auth.service';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { User } from '../../src/user/entities/user.entity';
export interface AuthenticatedRequest extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: AuthenticatedRequest): Promise<{
        access_token: string;
    }>;
    signUp(body: CreateUserDto): Promise<any>;
}
