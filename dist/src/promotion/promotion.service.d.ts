import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
import { Repository } from "typeorm";
import { Promotion } from "./entities/promotion.entity";
import { ResponseData } from "src/utility/response.utill";
import { ShopService } from "src/shop/shop.service";
export declare class PromotionService {
    private promotionRepository;
    private shopService;
    constructor(promotionRepository: Repository<Promotion>, shopService: ShopService);
    create(createPromotionDto: CreatePromotionDto, shopId: string): Promise<ResponseData<Promotion>>;
    findAll(): Promise<ResponseData<Promotion[]>>;
    findOne(promotion_id: string): Promise<ResponseData<Promotion>>;
    update(promotion_id: string, updatePromotionDto: UpdatePromotionDto): Promise<ResponseData<Promotion | null>>;
    remove(promotion_id: string): Promise<ResponseData<null>>;
}
