import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
export declare class CartItem {
    cart_item_id: string;
    quantity: string;
    total_price: string;
    cart: Cart;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
