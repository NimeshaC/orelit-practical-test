import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/order.entity").Order>>;
}
