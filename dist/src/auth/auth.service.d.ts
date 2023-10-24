import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { ResponseData } from "src/utility/response.utill";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<User | null>;
    login(user: User): Promise<ResponseData<any>>;
    signUp(userInfo: CreateUserDto): Promise<any>;
}
