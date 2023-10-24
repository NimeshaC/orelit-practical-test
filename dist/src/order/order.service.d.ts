import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
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
    createOrder(createOrderDto: CreateOrderDto): Promise<ResponseData<Order>>;
    updateOrderItem(order_item_id: string, updateOrderItemDto: UpdateOrderDto): Promise<ResponseData<OrderItem>>;
    deleteOrder(order_id: string): Promise<ResponseData<Order>>;
    findAllOrderItemsByShopId(shop_id: string): Promise<ResponseData<OrderItem[]>>;
    findOrderById(order_id: string): Promise<ResponseData<Order>>;
    findAllOrdersByUserId(user_id: string): Promise<ResponseData<Order[]>>;
}
