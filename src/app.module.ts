import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "../config/configuration";
import { validationSchema } from "../config/validationSchema";
import { ProductModule } from "./product/product.module";
import { PromotionModule } from "./promotion/promotion.module";
import { CartModule } from "./cart/cart.module";
import { OrderModule } from "./order/order.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-sorce";
import { ShopModule } from "./shop/shop.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
      validationSchema,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
