import { Module } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { PromotionController } from "./promotion.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Promotion } from "./entities/promotion.entity";
import { ShopModule } from "src/shop/shop.module";

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), ShopModule],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
