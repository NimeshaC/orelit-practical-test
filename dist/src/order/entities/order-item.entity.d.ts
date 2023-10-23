import { Product } from "src/product/entities/product.entity";
import { Order } from "./order.entity";
export declare class OrderItem {
    order_item_id: string;
    quantity: string;
    order_item_status: string;
    gross_price: string;
    createdAt: Date;
    product: Product;
    order: Order;
    updatedAt: Date;
    constructor();
}
