import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
import { Repository } from "typeorm";
import { Promotion } from "./entities/promotion.entity";
import { ResponseData } from "src/utility/response.utill";
import { UserService } from "src/user/user.service";
import { ProductService } from "src/product/product.service";
export declare class PromotionService {
    private promotionRepository;
    private productService;
    readonly userService: UserService;
    constructor(promotionRepository: Repository<Promotion>, productService: ProductService, userService: UserService);
    create(createPromotionDto: CreatePromotionDto): Promise<ResponseData<Promotion>>;
    findAll(): Promise<ResponseData<Promotion[]>>;
    findOne(promotion_id: string): Promise<ResponseData<Promotion>>;
    findAllByProductId(productId: string): Promise<ResponseData<Promotion[]>>;
    update(promotion_id: string, updatePromotionDto: UpdatePromotionDto): Promise<ResponseData<Promotion | null>>;
    remove(promotion_id: string): Promise<ResponseData<null>>;
}
