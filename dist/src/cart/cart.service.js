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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const response_utill_1 = require("../utility/response.utill");
const promotion_service_1 = require("../promotion/promotion.service");
const cart_item_entity_1 = require("./entities/cart-item.entity");
let CartService = class CartService {
    constructor(cartRepository, cartItemRepository, userService, productService, promotionService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.productService = productService;
        this.promotionService = promotionService;
    }
    async createCartItem(createCartItemDto) {
        try {
            const cart = await this.cartRepository.findOne({
                where: { cart_id: createCartItemDto.cart_id },
            });
            const product = await this.productService.findOneById(createCartItemDto.product_id);
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            const getPromotions = await this.promotionService.findAllByProductId(createCartItemDto.product_id);
            const activePromotion = getPromotions.data.filter((promotion) => {
                const startDate = new Date(promotion.promotion_start_date);
                const endDate = new Date(promotion.promotion_end_date);
                const currentDate = new Date();
                return startDate <= currentDate && endDate >= currentDate;
            });
            console.log(activePromotion, "activePromotion........");
            const discountedProductPrice = activePromotion.map((promotion) => {
                return (Number(product.data.price) -
                    (Number(product.data.price) * Number(promotion.discount_percentage)) /
                        100);
            });
            const totalPrice = () => {
                if (getPromotions.data.length > 0) {
                    return discountedProductPrice[0] * Number(createCartItemDto.quantity);
                }
                else {
                    return (Number(product.data.price) * Number(createCartItemDto.quantity));
                }
            };
            console.log(totalPrice(), "total........");
            console.log(discountedProductPrice, "discountedProductPrice........");
            const cartItem = await this.cartItemRepository.save({
                ...createCartItemDto,
                total_price: totalPrice().toString(),
                cart: cart,
                product: product.data,
            });
            return (0, response_utill_1.generateResponse)(true, 200, " CartItem created successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async updateCartItem(cartItemId, updateCartItemDto) {
        try {
            const cartItem = await this.cartItemRepository.findOne({
                where: { cart_item_id: cartItemId },
            });
            if (!cartItem) {
                throw new common_1.BadRequestException("CartItem not found");
            }
            const product = await this.productService.findOneById(updateCartItemDto.product_id);
            if (!product) {
                throw new Error("Product not found");
            }
            const getPromotions = await this.promotionService.findAllByProductId(updateCartItemDto.product_id);
            const activePromotion = getPromotions.data.filter((promotion) => {
                const startDate = new Date(promotion.promotion_start_date);
                const endDate = new Date(promotion.promotion_end_date);
                const currentDate = new Date();
                return startDate <= currentDate && endDate >= currentDate;
            });
            console.log(activePromotion, "activePromotion........");
            const discountedProductPrice = activePromotion.map((promotion) => {
                return (Number(product.data.price) -
                    (Number(product.data.price) * Number(promotion.discount_percentage)) /
                        100);
            });
            const totalPrice = () => {
                if (getPromotions.data.length > 0) {
                    return (discountedProductPrice[0] * Number(updateCartItemDto.quantity) +
                        Number(cartItem.total_price));
                }
                else {
                    return (Number(product.data.price) * Number(updateCartItemDto.quantity) +
                        Number(cartItem.total_price));
                }
            };
            const totalQuantity = Number(updateCartItemDto.quantity) + Number(cartItem.quantity);
            console.log(totalPrice(), "total........");
            const updatedCartItem = await this.cartItemRepository.update({ cart_item_id: cartItemId }, {
                ...updateCartItemDto,
                total_price: totalPrice().toString(),
                quantity: totalQuantity.toString(),
            });
            console.log(updatedCartItem, "updatedCartItem........");
            return (0, response_utill_1.generateResponse)(true, 200, " CartItem updated successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async createCart(createCartDto) {
        try {
            const user = await this.userService.findOneById(createCartDto.user_id);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const cart = await this.cartRepository.save({
                ...createCartDto,
                user: user.data,
            });
            await this.createCartItem({
                cart_id: cart.cart_id,
                product_id: createCartDto.product_id,
                quantity: createCartDto.quantity,
            });
            const cartData = await this.findCartById(cart.cart_id);
            const totalPrice = cartData.data.cartItems
                .map((item) => {
                return Number(item.total_price);
            })
                .reduce((acc, item) => acc + item, 0);
            const totalQuantity = cartData.data.cartItems
                .map((item) => {
                return Number(item.quantity);
            })
                .reduce((acc, item) => acc + item, 0);
            const data = await this.cartRepository.update({ cart_id: cart.cart_id }, {
                total_price: totalPrice.toString(),
                total_quantity: totalQuantity.toString(),
            });
            const updatedCartData = await this.findCartById(cart.cart_id);
            return (0, response_utill_1.generateResponse)(true, 200, " Cart created successfully", updatedCartData.data);
        }
        catch (error) {
            throw error;
        }
    }
    async findCartById(cartId) {
        try {
            const cart = await this.cartRepository.findOne({
                where: { cart_id: cartId },
            });
            if (!cart) {
                throw new common_1.BadRequestException("Cart not found");
            }
            const cartItems = await this.cartItemRepository.find({
                where: { cart: { cart_id: cartId } },
            });
            const cartData = {
                ...cart,
                cartItems,
            };
            return (0, response_utill_1.generateResponse)(true, 200, "Cart found", cartData);
        }
        catch (error) {
            throw error;
        }
    }
    async updateCart(cartId, updateCartDto) {
        try {
            const cart = await this.cartRepository.findOne({
                where: { cart_id: cartId },
            });
            if (!cart) {
                throw new common_1.BadRequestException("Cart not found");
            }
            const user = await this.userService.findOneById(updateCartDto.user_id);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const existing = await this.cartItemRepository.findOne({
                where: {
                    cart: { cart_id: cartId },
                    product: { product_id: updateCartDto.product_id },
                },
            });
            if (existing) {
                await this.updateCartItem(existing.cart_item_id, {
                    quantity: updateCartDto.quantity,
                });
            }
            else {
                await this.createCartItem({
                    cart_id: cart.cart_id,
                    product_id: updateCartDto.product_id,
                    quantity: updateCartDto.quantity,
                });
            }
            const cartData = await this.findCartById(cart.cart_id);
            const totalPrice = cartData.data.cartItems
                .map((item) => {
                return Number(item.total_price);
            })
                .reduce((acc, item) => acc + item, 0);
            const totalQuantity = cartData.data.cartItems
                .map((item) => {
                return Number(item.quantity);
            })
                .reduce((acc, item) => acc + item, 0);
            const data = await this.cartRepository.update({ cart_id: cart.cart_id }, {
                total_price: totalPrice.toString(),
                total_quantity: totalQuantity.toString(),
            });
            const updatedCartData = await this.findCartById(cart.cart_id);
            console.log(cartData, "updatecartData........");
            return (0, response_utill_1.generateResponse)(true, 200, " Cart updated successfully", updatedCartData.data);
        }
        catch (error) {
            throw error;
        }
    }
    async removeCartItem(cartItemId) {
        try {
            const cartItem = await this.cartItemRepository.findOne({
                where: { cart_item_id: cartItemId },
            });
            if (!cartItem) {
                throw new common_1.BadRequestException("CartItem not found");
            }
            await this.cartItemRepository.delete({
                cart_item_id: cartItemId,
            });
            return (0, response_utill_1.generateResponse)(true, 200, "CartItem deleted successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async removeCart(cartId) {
        try {
            const cart = await this.cartRepository.findOne({
                where: { cart_id: cartId },
            });
            if (!cart) {
                throw new common_1.BadRequestException("Cart not found");
            }
            await this.cartRepository.delete({
                cart_id: cartId,
            });
            const cartData = await this.findCartById(cart.cart_id);
            return (0, response_utill_1.generateResponse)(true, 200, "Cart deleted successfully", cartData.data);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        product_service_1.ProductService,
        promotion_service_1.PromotionService])
], CartService);
//# sourceMappingURL=cart.service.js.map