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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const shop_service_1 = require("../shop/shop.service");
const user_service_1 = require("../user/user.service");
const response_utill_1 = require("../utility/response.utill");
let ProductService = class ProductService {
    constructor(productRepository, shopService, userService) {
        this.productRepository = productRepository;
        this.shopService = shopService;
        this.userService = userService;
    }
    async create(createProductDto) {
        try {
            const user = await this.userService.findOneById(createProductDto.user_id);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const shop = await this.shopService.findOne(createProductDto.shop_id);
            if (!shop.data) {
                throw new common_1.BadRequestException("Shop not found");
            }
            await this.productRepository.save({
                ...createProductDto,
                shop: shop.data,
                user: user.data,
            });
            return (0, response_utill_1.generateResponse)(true, 200, " Product created successfully");
        }
        catch (error) {
            if (error.code == "23505") {
                throw new common_1.BadRequestException("Product already exists");
            }
            throw error;
        }
    }
    async findAll() {
        const product = await this.productRepository.find();
        return (0, response_utill_1.generateResponse)(true, 200, "Products retrieved successfully", product);
    }
    async findAllByShopId(shopId) {
        try {
            const shop = await this.shopService.findOne(shopId);
            if (!shop.data) {
                throw new common_1.BadRequestException("Shop not found");
            }
            const product = await this.productRepository.find({
                where: { shop: { shop_id: shopId } },
            });
            return (0, response_utill_1.generateResponse)(true, 200, "Products retrieved successfully", product);
        }
        catch (error) {
            throw error;
        }
    }
    async findOneById(product_id) {
        try {
            const product = await this.productRepository.findOne({
                where: { product_id },
            });
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            return (0, response_utill_1.generateResponse)(true, 200, "Product retrieved successfully", product);
        }
        catch (error) {
            throw error;
        }
    }
    async update(product_id, updateProductDto) {
        try {
            const product = await this.productRepository.findOne({
                where: { product_id },
            });
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            const updatedProduct = await this.productRepository.save({
                ...product,
                ...updateProductDto,
            });
            return (0, response_utill_1.generateResponse)(true, 200, "Product updated successfully", updatedProduct);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(product_id) {
        try {
            const product = await this.productRepository.findOne({
                where: { product_id },
            });
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            await this.productRepository.delete({ product_id });
            return (0, response_utill_1.generateResponse)(true, 200, "Product deleted successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        shop_service_1.ShopService,
        user_service_1.UserService])
], ProductService);
//# sourceMappingURL=product.service.js.map