import { User } from "src/user/entities/user.entity";
import { OrderItem } from "./order-item.entity";
export declare class Order {
    order_id: string;
    total_quantity: string;
    order_date: string;
    order_total: string;
    order_address: string;
    order_phone: string;
    payment_method: string;
    user: User;
    order_items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
