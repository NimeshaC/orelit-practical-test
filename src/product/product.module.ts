import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ShopModule } from "src/shop/shop.module";
import { UserModule } from "src/user/user.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ShopModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService, JwtService],
  exports: [ProductService],
})
export class ProductModule {}
