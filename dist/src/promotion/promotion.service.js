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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promotion_entity_1 = require("./entities/promotion.entity");
const response_utill_1 = require("../utility/response.utill");
const shop_service_1 = require("../shop/shop.service");
let PromotionService = class PromotionService {
    constructor(promotionRepository, shopService) {
        this.promotionRepository = promotionRepository;
        this.shopService = shopService;
    }
    async create(createPromotionDto, shopId) {
        try {
            const shop = await this.shopService.findOne(shopId);
            if (!shop.data) {
                throw new common_1.BadRequestException("Shop not found");
            }
            const promotion = await this.promotionRepository.save(createPromotionDto);
            return (0, response_utill_1.generateResponse)(true, 200, " Promotion created successfully", promotion);
        }
        catch (error) {
            if (error.code == "23505") {
                throw new common_1.BadRequestException("Promotion already exists");
            }
            throw error;
        }
    }
    async findAll() {
        const promotion = await this.promotionRepository.find();
        return (0, response_utill_1.generateResponse)(true, 200, "All Promotions", promotion);
    }
    async findOne(promotion_id) {
        try {
            const promotion = await this.promotionRepository.findOne({
                where: { promotion_id },
            });
            if (!promotion) {
                throw new common_1.BadRequestException("Promotion not found");
            }
            return (0, response_utill_1.generateResponse)(true, 200, "Promotion", promotion);
        }
        catch (error) {
            throw error;
        }
    }
    async update(promotion_id, updatePromotionDto) {
        try {
            const promotion = await this.promotionRepository.findOne({
                where: { promotion_id },
            });
            if (!promotion) {
                throw new common_1.BadRequestException("Promotion not found");
            }
            const updatedPromotion = await this.promotionRepository.save({
                ...promotion,
                ...updatePromotionDto,
            });
            return (0, response_utill_1.generateResponse)(true, 200, "Promotion updated successfully", updatedPromotion);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(promotion_id) {
        try {
            const promotion = await this.promotionRepository.findOne({
                where: { promotion_id },
            });
            if (!promotion) {
                throw new common_1.BadRequestException("Promotion not found");
            }
            await this.promotionRepository.delete({ promotion_id });
            return (0, response_utill_1.generateResponse)(true, 200, "Promotion deleted successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PromotionService = PromotionService;
exports.PromotionService = PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        shop_service_1.ShopService])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map