import { Module } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { PromotionController } from "./promotion.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Promotion } from "./entities/promotion.entity";
import { UserModule } from "src/user/user.module";
import { ProductModule } from "src/product/product.module";

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), ProductModule, UserModule],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
