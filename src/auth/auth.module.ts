import { JwtModule, JwtService } from "@nestjs/jwt/dist";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../../src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../src/user/entities/user.entity";
@Module({
  imports: [
    JwtModule.register({
      secret: "ORELITPRACTICALTESTJWTSECRET/s",
      signOptions: { expiresIn: "1d" },
    }),
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
