import { PromotionService } from "./promotion.service";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
export declare class PromotionController {
    private readonly promotionService;
    constructor(promotionService: PromotionService);
    create(createPromotionDto: CreatePromotionDto, shopId: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/promotion.entity").Promotion>>;
    findAll(): Promise<import("../utility/response.utill").ResponseData<import("./entities/promotion.entity").Promotion[]>>;
    findOne(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/promotion.entity").Promotion>>;
    update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/promotion.entity").Promotion>>;
    remove(id: string): Promise<import("../utility/response.utill").ResponseData<null>>;
}
