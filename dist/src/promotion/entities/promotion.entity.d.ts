import { Shop } from "src/shop/entities/shop.entity";
import { User } from "src/user/entities/user.entity";
export declare class Promotion {
    promotion_id: string;
    promotion_name: string;
    promotion_description: string;
    promotion_start_date: string;
    promotion_end_date: string;
    promotion_discount: string;
    shop: Shop;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
