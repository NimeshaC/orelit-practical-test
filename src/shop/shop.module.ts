import { Module } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./entities/shop.entity";
import { UserModule } from "src/user/user.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UserModule],
  controllers: [ShopController],
  providers: [ShopService, JwtService],
  exports: [ShopService],
})
export class ShopModule {}
