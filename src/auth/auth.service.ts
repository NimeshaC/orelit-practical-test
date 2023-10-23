import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotAcceptableException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { UpdateUserDto } from "../../src/user/dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  //check received username and password match
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }
    const passwordIsValid = user.password === pass;

    return passwordIsValid ? user : null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      roleName: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // create new user
  async signUp(userInfo: CreateUserDto): Promise<any> {
    return await this.userService.create(userInfo);
  }
}
