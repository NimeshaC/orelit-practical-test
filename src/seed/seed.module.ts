import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedService } from "./seed.service";
import { Module } from "@nestjs/common";
import { UserSeeder } from "./users.seeder";
import { User } from "src/user/entities/user.entity";
import { seedOrmConfig } from "db/data-sorce";

@Module({
  imports: [
    TypeOrmModule.forRoot(seedOrmConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [SeedService, UserSeeder],
})
export class SeedModule {}
