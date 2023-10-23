import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Shop } from "src/shop/entities/shop.entity";
export declare class User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    shops: Shop[];
    promotions: Promotion[];
    products: Product[];
    orders: Order[];
    cart: Cart;
    constructor();
}
