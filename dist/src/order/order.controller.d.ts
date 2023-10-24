import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/order.entity").Order>>;
    findAllOrderItemsByShopId(shop_id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/order-item.entity").OrderItem[]>>;
    findOne(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/order.entity").Order>>;
    findAllOrdersByUserId(user_id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/order.entity").Order[]>>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/order-item.entity").OrderItem>>;
    remove(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/order.entity").Order>>;
}
