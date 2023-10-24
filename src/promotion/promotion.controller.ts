import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";

@Controller("promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  // create promotion controller
  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  // find all promotions controller
  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  // find a promotion controller
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.promotionService.findOne(id);
  }

  // find all promotions related to a product controller
  @Get("product/:productId")
  findAllByShopId(@Param("productId") productId: string) {
    return this.promotionService.findAllByProductId(productId);
  }

  // update promotion controller
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePromotionDto: UpdatePromotionDto
  ) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  // remove promotion controller
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.promotionService.remove(id);
  }
}
