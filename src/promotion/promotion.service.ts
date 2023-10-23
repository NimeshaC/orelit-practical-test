import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Promotion } from "./entities/promotion.entity";
import { ResponseData, generateResponse } from "src/utility/response.utill";
import { UserService } from "src/user/user.service";
import { ProductService } from "src/product/product.service";

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,

    private productService: ProductService,
    readonly userService: UserService
  ) {}

  async create(
    createPromotionDto: CreatePromotionDto
  ): Promise<ResponseData<Promotion>> {
    try {
      const user = await this.userService.findOneById(
        createPromotionDto.user_id
      );
      if (!user) {
        throw new BadRequestException("User not found");
      }
      const product = await this.productService.findOneById(
        createPromotionDto.product_id
      );
      if (!product) {
        throw new BadRequestException("Product not found");
      }
      const promotion = await this.promotionRepository.save({
        ...createPromotionDto,
        product: product.data,
        user: user.data,
      });
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

  async findAllByProductId(
    productId: string
  ): Promise<ResponseData<Promotion[]>> {
    try {
      const product = await this.productService.findOneById(productId);
      if (!product) {
        throw new BadRequestException("Product not found");
      }
      const promotion = await this.promotionRepository.find({
        where: { product: { product_id: productId } },
      });
      return generateResponse(true, 200, "All Promotions", promotion);
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
