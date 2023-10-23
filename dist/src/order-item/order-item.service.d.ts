import { CreateOrderItemDto } from "../order/entities/create-order-item.dto";
import { UpdateOrderItemDto } from "../order/entities/update-order-item.dto";
export declare class OrderItemService {
    create(createOrderItemDto: CreateOrderItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: number): string;
}
