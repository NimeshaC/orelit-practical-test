"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../config/configuration");
const validationSchema_1 = require("../config/validationSchema");
const product_module_1 = require("./product/product.module");
const promotion_module_1 = require("./promotion/promotion.module");
const cart_module_1 = require("./cart/cart.module");
const order_module_1 = require("./order/order.module");
const typeorm_1 = require("@nestjs/typeorm");
const data_sorce_1 = require("../db/data-sorce");
const shop_module_1 = require("./shop/shop.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
                load: [configuration_1.configuration],
                isGlobal: true,
                validationSchema: validationSchema_1.validationSchema,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                ...data_sorce_1.dataSourceOptions,
                autoLoadEntities: true,
            }),
            product_module_1.ProductModule,
            promotion_module_1.PromotionModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            shop_module_1.ShopModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map