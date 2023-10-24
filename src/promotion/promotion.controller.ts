import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
import { jwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/authorization/role.guard";
import { Roles } from "src/auth/authorization/roles.decorator";
import { Role } from "src/auth/authorization/roles.enum";

@Controller("promotion")
@UseGuards(jwtAuthGuard)
@UseGuards(RolesGuard)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  // create promotion controller
  @Post()
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  // find all promotions controller
  @Get()
  @Roles([Role.SYSTEM_ADMIN])
  findAll() {
    return this.promotionService.findAll();
  }

  // find a promotion controller
  @Get(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findOne(@Param("id") id: string) {
    return this.promotionService.findOne(id);
  }

  // find all promotions related to a product controller
  @Get("product/:productId")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findAllByProductId(@Param("productId") productId: string) {
    return this.promotionService.findAllByProductId(productId);
  }

  // update promotion controller
  @Patch(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  update(
    @Param("id") id: string,
    @Body() updatePromotionDto: UpdatePromotionDto
  ) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  // remove promotion controller
  @Delete(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  remove(@Param("id") id: string) {
    return this.promotionService.remove(id);
  }
}
