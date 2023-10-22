import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Promotion } from "./entities/promotion.entity";
import { ResponseData, generateResponse } from "src/utility/response.utill";
import { ShopService } from "src/shop/shop.service";

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,

    private shopService: ShopService
  ) {}

  async create(
    createPromotionDto: CreatePromotionDto,
    shopId: string
  ): Promise<ResponseData<Promotion>> {
    try {
      const shop = await this.shopService.findOne(shopId);
      if (!shop.data) {
        throw new BadRequestException("Shop not found");
      }
      const promotion = await this.promotionRepository.save(createPromotionDto);
      return generateResponse(
        true,
        200,
        " Promotion created successfully",
        promotion
      );
    } catch (error) {
      if (error.code == "23505") {
        throw new BadRequestException("Promotion already exists");
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseData<Promotion[]>> {
    const promotion = await this.promotionRepository.find();
    return generateResponse(true, 200, "All Promotions", promotion);
  }

  async findOne(promotion_id: string): Promise<ResponseData<Promotion>> {
    try {
      const promotion = await this.promotionRepository.findOne({
        where: { promotion_id },
      });
      if (!promotion) {
        throw new BadRequestException("Promotion not found");
      }
      return generateResponse(true, 200, "Promotion", promotion);
    } catch (error) {
      throw error;
    }
  }

  async update(
    promotion_id: string,
    updatePromotionDto: UpdatePromotionDto
  ): Promise<ResponseData<Promotion | null>> {
    try {
      const promotion = await this.promotionRepository.findOne({
        where: { promotion_id },
      });
      if (!promotion) {
        throw new BadRequestException("Promotion not found");
      }
      const updatedPromotion = await this.promotionRepository.save({
        ...promotion,
        ...updatePromotionDto,
      });
      return generateResponse(
        true,
        200,
        "Promotion updated successfully",
        updatedPromotion
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(promotion_id: string): Promise<ResponseData<null>> {
    try {
      const promotion = await this.promotionRepository.findOne({
        where: { promotion_id },
      });
      if (!promotion) {
        throw new BadRequestException("Promotion not found");
      }
      await this.promotionRepository.delete({ promotion_id });
      return generateResponse(true, 200, "Promotion deleted successfully");
    } catch (error) {
      throw error;
    }
  }
}
