import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/cart.entity").Cart>>;
    findOneById(id: string): Promise<import("../utility/response.utill").ResponseData<any>>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/cart.entity").Cart>>;
    removeCart(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/cart.entity").Cart>>;
    removeCartItem(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/cart-item.entity").CartItem>>;
}
