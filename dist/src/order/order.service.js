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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const cart_service_1 = require("../cart/cart.service");
const response_utill_1 = require("../utility/response.utill");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepository, cartService, productService, userService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartService = cartService;
        this.productService = productService;
        this.userService = userService;
    }
    async createOrderItem(createOrderItemDto, cart_id, quantity, gross_price) {
        try {
            const order = await this.orderRepository.findOne({
                where: { order_id: createOrderItemDto.order_id },
            });
            if (!order) {
                throw new common_1.BadRequestException("Order not found");
            }
            const cart = await this.cartService.findCartById(cart_id);
            if (!cart) {
                throw new common_1.BadRequestException("Cart not found");
            }
            const product = await this.productService.findOneById(createOrderItemDto.product_id);
            if (!product) {
                throw new common_1.BadRequestException("Product not found");
            }
            const data = await this.orderItemRepository.save({
                order_item_status: "Success",
                quantity: quantity,
                gross_price: gross_price,
                product: product.data,
                order: order,
            });
            console.log(data, "data............");
            const orderItems = await this.orderItemRepository.find({
                where: { order: order },
            });
            console.log(orderItems, "orderItems............");
            return (0, response_utill_1.generateResponse)(true, 200, "Order Item Created");
        }
        catch (error) {
            throw error;
        }
    }
    async create(createOrderDto) {
        try {
            const cart = await this.cartService.findCartById(createOrderDto.cart_id);
            if (!cart) {
                throw new common_1.BadRequestException("Cart not found");
            }
            const user = await this.userService.findOneById(createOrderDto.user_id);
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const order = await this.orderRepository.save({
                ...createOrderDto,
                order_date: new Date().getFullYear() +
                    "-" +
                    new Date().getMonth() +
                    "-" +
                    new Date().getDate(),
                order_total: cart.data.total_price,
                total_quantity: cart.data.total_quantity,
                user: user.data,
            });
            console.log(order, "order................");
            cart.data.cartItems
                .map((cartItem) => cartItem)
                .forEach(async (item) => {
                console.log(item, "Item............");
                await this.createOrderItem({
                    order_id: order.order_id,
                    product_id: item.product.product_id,
                    order_item_status: "Success",
                }, createOrderDto.cart_id, item.quantity, item.total_price);
            });
            console.log("order created............");
            return (0, response_utill_1.generateResponse)(true, 200, "Order Created");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cart_service_1.CartService,
        product_service_1.ProductService,
        user_service_1.UserService])
], OrderService);
//# sourceMappingURL=order.service.js.map