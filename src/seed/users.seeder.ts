import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SeederInterface } from "./seeder.interface";
import { User } from "src/user/entities/user.entity";
import * as bcrypt from "bcrypt";
import { Role } from "src/auth/authorization/roles.enum";

@Injectable()
export class UserSeeder implements SeederInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async seed() {
    const data: Partial<User> = {
      username: process.env.USERNAME,
      email: process.env.EMAIL,
      role: process.env.ROLE as Role,
      password: await hashPassword(process.env.PASSWORD),
    };

    await this.userRepository.save(data);
  }
}

//encrypt password
async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}
