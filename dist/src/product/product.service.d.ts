import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { ShopService } from "src/shop/shop.service";
import { UserService } from "src/user/user.service";
import { ResponseData } from "src/utility/response.utill";
export declare class ProductService {
    private productRepository;
    private shopService;
    readonly userService: UserService;
    constructor(productRepository: Repository<Product>, shopService: ShopService, userService: UserService);
    create(createProductDto: CreateProductDto, shopId: string, userId: string): Promise<ResponseData<Product>>;
    findAll(): Promise<ResponseData<Product[]>>;
    findAllByShopId(shopId: string): Promise<ResponseData<Product[]>>;
    findOne(product_id: string): Promise<ResponseData<Product>>;
    update(product_id: string, updateProductDto: UpdateProductDto): Promise<ResponseData<Product | null>>;
    remove(product_id: string): Promise<ResponseData<Product | null>>;
}
