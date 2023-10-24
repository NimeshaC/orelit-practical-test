import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { jwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("user")
@UseGuards(jwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create user controller
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // find all users controller
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // find a user controller
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOneById(id);
  }

  // update user controller
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // remove user controller
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
