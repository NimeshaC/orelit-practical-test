import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
export declare class Promotion {
    promotion_id: string;
    promotion_name: string;
    promotion_description: string;
    promotion_start_date: string;
    promotion_end_date: string;
    discount_percentage: string;
    product: Product;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
