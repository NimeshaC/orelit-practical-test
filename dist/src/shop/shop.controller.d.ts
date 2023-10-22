import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
type QueryIds = {
    userId: string;
};
export declare class ShopController {
    private readonly shopsService;
    constructor(shopsService: ShopService);
    create(createShopDto: CreateShopDto, QueryIds: QueryIds): Promise<import("../utility/response.utill").ResponseData<import("./entities/shop.entity").Shop>>;
    findAll(): Promise<import("../utility/response.utill").ResponseData<import("./entities/shop.entity").Shop[]>>;
    findAllByUserId(userId: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/shop.entity").Shop[]>>;
    findOne(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/shop.entity").Shop>>;
    update(id: string, updateShopDto: UpdateShopDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/shop.entity").Shop>>;
    remove(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/shop.entity").Shop>>;
}
export {};
