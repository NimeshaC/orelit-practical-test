import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { Repository } from "typeorm";
import { Shop } from "./entities/shop.entity";
import { ResponseData } from "src/utility/response.utill";
import { UserService } from "src/user/user.service";
export declare class ShopService {
    private shopRepository;
    private userService;
    constructor(shopRepository: Repository<Shop>, userService: UserService);
    create(createShopDto: CreateShopDto, userId: string): Promise<ResponseData<Shop>>;
    findAll(): Promise<ResponseData<Shop[]>>;
    findAllByUserId(userId: string): Promise<ResponseData<Shop[]>>;
    findOne(shop_id: string): Promise<ResponseData<Shop>>;
    update(shop_id: string, updateShopDto: UpdateShopDto): Promise<ResponseData<Shop | null>>;
    remove(shop_id: string): Promise<ResponseData<Shop | null>>;
}
