import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { UpdateUserDto } from "../../src/user/dto/update-user.dto";
import { ResponseData, generateResponse } from "src/utility/response.utill";

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

    const passwordIsValid = await this.userService.verifyPassword(
      pass,
      user.password
    );

    return passwordIsValid ? user : null;
  }

  // login user
  async login(user: User): Promise<ResponseData<any>> {
    const payload = {
      email: user.email,
      roleName: user.role,
    };

    const userInfo = await this.userService.findOneByEmail(user.email);

    const { password, ...rest } = userInfo;

    const userData = {
      ...rest,
      access_token: this.jwtService.sign(payload),
    };

    return generateResponse(true, 200, "Login Successful", userData);
  }

  // create new user
  async signUp(userInfo: CreateUserDto): Promise<any> {
    return await this.userService.create(userInfo);
  }
}
