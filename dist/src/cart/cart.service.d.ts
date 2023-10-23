import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { ResponseData } from "src/utility/response.utill";
import { CartItem } from "./entities/cart-item.entity";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { PromotionService } from "src/promotion/promotion.service";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
export declare class CartService {
    private cartRepository;
    private cartItemRepository;
    readonly userService: UserService;
    private productService;
    private promotionService;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>, userService: UserService, productService: ProductService, promotionService: PromotionService);
    createCartItem(createCartItemDto: CreateCartItemDto): Promise<ResponseData<CartItem | undefined>>;
    updateCartItem(cartItemId: string, updateCartItemDto: UpdateCartItemDto): Promise<ResponseData<CartItem | undefined>>;
    createCart(createCartDto: CreateCartDto): Promise<ResponseData<Cart | undefined>>;
    findCartById(cartId: string): Promise<ResponseData<Cart | any>>;
    updateCart(cartId: string, updateCartDto: UpdateCartDto): Promise<ResponseData<Cart | undefined>>;
    removeCartItem(cartItemId: string): Promise<ResponseData<CartItem | undefined>>;
    removeCart(cartId: string): Promise<ResponseData<Cart | undefined>>;
}
