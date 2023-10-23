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
const user_service_1 = require("../user/user.service");
const product_service_1 = require("../product/product.service");
let PromotionService = class PromotionService {
    constructor(promotionRepository, productService, userService) {
        this.promotionRepository = promotionRepository;
        this.productService = productService;
        this.userService = userService;
    }
    async create(createPromotionDto) {
        try {
            const user = await this.userService.findOneById(createPromotionDto.user_id);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const product = await this.productService.findOneById(createPromotionDto.product_id);
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            const promotion = await this.promotionRepository.save({
                ...createPromotionDto,
                product: product.data,
                user: user.data,
            });
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
    async findAllByProductId(productId) {
        try {
            const product = await this.productService.findOneById(productId);
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            const promotion = await this.promotionRepository.find({
                where: { product: { product_id: productId } },
            });
            return (0, response_utill_1.generateResponse)(true, 200, "All Promotions", promotion);
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
        product_service_1.ProductService,
        user_service_1.UserService])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map