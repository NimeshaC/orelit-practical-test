import { Shop } from "src/shop/entities/shop.entity";
import { User } from "src/user/entities/user.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { OrderItem } from "src/order/entities/order-item.entity";
import { CartItem } from "src/cart/entities/cart-item.entity";
export declare class Product {
    product_id: string;
    product_name: string;
    product_code: string;
    product_image: string;
    product_description: string;
    price: string;
    stock_quantity: string;
    shop: Shop;
    user: User;
    promotions: Promotion[];
    cart_items: CartItem[];
    order_item: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
