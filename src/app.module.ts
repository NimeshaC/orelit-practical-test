import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { PromotionModule } from "./promotion/promotion.module";
import { CartModule } from "./cart/cart.module";
import { OrderModule } from "./order/order.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopModule } from "./shop/shop.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { dataSourceOptions } from "../db/data-sorce";
import { SeedModule } from "./seed/seed.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ProductModule,
    PromotionModule,
    CartModule,
    OrderModule,
    ShopModule,
    UserModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
