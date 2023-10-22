import { Promotion } from "src/promotion/entities/promotion.entity";
export declare class Shop {
    shop_id: string;
    shop_name: string;
    shop_phone: string;
    admin_id: string;
    createdAt: Date;
    promotions: Promotion[];
    updatedAt: Date;
    constructor();
}
