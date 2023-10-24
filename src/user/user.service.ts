import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ResponseData, generateResponse } from "src/utility/response.utill";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  //verify password
  async verifyPassword(password: string, password1: string) {
    try {
      const passwordMatches = await bcrypt.compare(password, password1);

      if (passwordMatches) {
        return true;
      }
      return false;
    } catch (error) {
      throw new ForbiddenException("Not valid Password", error.message);
    }
  }

  //find user by email
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user || null;
  }

  //encrypt password
  async hashPassword(password: string) {
    const saltRounds = 10;

    const hashedPassword: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseData<User>> {
    try {
      const { email, role } = createUserDto;
      const existingUser = await this.userRepository.find({
        where: { email, role },
      });

      if (existingUser && existingUser.length > 0) {
        throw new BadRequestException("Email already exists");
      }
      await this.userRepository.save({
        ...createUserDto,
        password: await this.hashPassword(createUserDto.password),
      });
      return generateResponse(true, 200, " User created successfully");
    } catch (error) {
      return generateResponse(false, error.status || 500, error.message);
    }
  }

  async findAll(): Promise<ResponseData<User[]>> {
    const user = await this.userRepository.find();
    return generateResponse(true, 200, "All Users", user);
  }

  async findOneById(user_id: string): Promise<ResponseData<User>> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id },
      });
      if (!user) {
        throw new BadRequestException("User not found");
      }
      return generateResponse(true, 200, "User", user);
    } catch (error) {
      throw error;
    }
  }

  async update(
    user_id: string,
    updateUserDto: UpdateUserDto
  ): Promise<ResponseData<User | null>> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id },
      });
      if (!user) {
        throw new BadRequestException("User not found");
      }
      const updatedUser = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
      return generateResponse(
        true,
        200,
        "User updated successfully",
        updatedUser
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(user_id: string): Promise<ResponseData<User | null>> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id },
      });
      if (!user) {
        throw new BadRequestException("User not found");
      }
      await this.userRepository.delete({ user_id });
      return generateResponse(true, 200, "User deleted successfully");
    } catch (error) {
      throw error;
    }
  }
}
