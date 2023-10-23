import { Module, forwardRef } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { UserModule } from "src/user/user.module";
import { CartItem } from "./entities/cart-item.entity";
import { ProductModule } from "src/product/product.module";
import { PromotionModule } from "src/promotion/promotion.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    UserModule,
    ProductModule,
    PromotionModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
