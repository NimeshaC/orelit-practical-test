import { Shop } from "src/shop/entities/shop.entity";
import { User } from "src/user/entities/user.entity";
export declare class Product {
    product_id: string;
    product_name: string;
    product_code: string;
    product_image: string;
    product_description: string;
    price: string;
    discounted_price: string;
    stock_quantity: string;
    shop: Shop;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
