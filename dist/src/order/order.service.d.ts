import { CreateOrderDto } from "./dto/create-order.dto";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";
import { CartService } from "src/cart/cart.service";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { ResponseData } from "src/utility/response.utill";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
export declare class OrderService {
    private orderRepository;
    private orderItemRepository;
    private cartService;
    private productService;
    private userService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, cartService: CartService, productService: ProductService, userService: UserService);
    createOrderItem(createOrderItemDto: CreateOrderItemDto, cart_id: string, quantity: string, gross_price: string): Promise<ResponseData<OrderItem>>;
    create(createOrderDto: CreateOrderDto): Promise<ResponseData<Order>>;
}
