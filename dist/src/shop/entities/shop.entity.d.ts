import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
export declare class Shop {
    shop_id: string;
    shop_name: string;
    shop_phone: string;
    shop_address: string;
    createdAt: Date;
    user: User;
    products: Product[];
    updatedAt: Date;
    constructor();
}
