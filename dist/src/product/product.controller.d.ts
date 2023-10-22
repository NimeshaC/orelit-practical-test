import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
type QueryIds = {
    shopId: string;
    userId: string;
};
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, QueryIds: QueryIds): Promise<import("../utility/response.utill").ResponseData<import("./entities/product.entity").Product>>;
    findAll(): Promise<import("../utility/response.utill").ResponseData<import("./entities/product.entity").Product[]>>;
    findAllByShopId(shopId: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/product.entity").Product[]>>;
    findOne(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/product.entity").Product>>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/product.entity").Product>>;
    remove(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/product.entity").Product>>;
}
export {};
