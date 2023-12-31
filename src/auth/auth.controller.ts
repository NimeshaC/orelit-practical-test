import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Put,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { User } from "../../src/user/entities/user.entity";
import { UpdateUserDto } from "../../src/user/dto/update-user.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login controller
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user as User);
  }

  // signup controller
  @Post("signup")
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }
}
