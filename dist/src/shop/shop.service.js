"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shop_entity_1 = require("./entities/shop.entity");
const response_utill_1 = require("../utility/response.utill");
const user_service_1 = require("../user/user.service");
let ShopService = class ShopService {
    constructor(shopRepository, userService) {
        this.shopRepository = shopRepository;
        this.userService = userService;
    }
    async create(createShopDto) {
        try {
            const user = await this.userService.findOneById(createShopDto.user_id);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            await this.shopRepository.save({
                ...createShopDto,
                user: user.data,
            });
            return (0, response_utill_1.generateResponse)(true, 200, "Shop created successfully");
        }
        catch (error) {
            if (error.code == "23505") {
                throw new common_1.BadRequestException("Shop already exists");
            }
            throw error;
        }
    }
    async findAll() {
        const shop = await this.shopRepository.find();
        return (0, response_utill_1.generateResponse)(true, 200, "Shops are retrived successfully", shop);
    }
    async findAllByUserId(userId) {
        try {
            const user = await this.userService.findOneById(userId);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const shop = await this.shopRepository.find({
                where: { user: { user_id: userId } },
            });
            return (0, response_utill_1.generateResponse)(true, 200, "Shops are retrived successfully ", shop);
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(shop_id) {
        try {
            const shop = await this.shopRepository.findOne({
                where: { shop_id },
            });
            if (!shop) {
                throw new common_1.BadRequestException("Shop not found");
            }
            return (0, response_utill_1.generateResponse)(true, 200, "Shop retrived successfully ", shop);
        }
        catch (error) {
            throw error;
        }
    }
    async update(shop_id, updateShopDto) {
        try {
            const shop = await this.shopRepository.findOne({
                where: { shop_id },
            });
            if (!shop) {
                throw new common_1.BadRequestException("Shop not found");
            }
            const updatedShop = await this.shopRepository.save({
                ...shop,
                ...updateShopDto,
            });
            return (0, response_utill_1.generateResponse)(true, 200, "Shop updated successfully", updatedShop);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(shop_id) {
        try {
            const shop = await this.shopRepository.findOne({
                where: { shop_id },
            });
            if (!shop) {
                throw new common_1.BadRequestException("Shop not found");
            }
            await this.shopRepository.delete({ shop_id });
            return (0, response_utill_1.generateResponse)(true, 200, "Shop deleted successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], ShopService);
//# sourceMappingURL=shop.service.js.map