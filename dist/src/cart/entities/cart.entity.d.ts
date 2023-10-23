import { User } from "src/user/entities/user.entity";
import { CartItem } from "./cart-item.entity";
export declare class Cart {
    cart_id: string;
    total_quantity: string;
    total_price: string;
    user: User;
    cart_items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
