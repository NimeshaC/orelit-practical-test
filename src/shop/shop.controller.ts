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
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { RolesGuard } from "src/auth/authorization/role.guard";
import { jwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Roles } from "src/auth/authorization/roles.decorator";
import { Role } from "src/auth/authorization/roles.enum";

@Controller("shop")
@UseGuards(jwtAuthGuard)
@UseGuards(RolesGuard)
export class ShopController {
  constructor(private readonly shopsService: ShopService) {}

  // create shop controller
  @Post()
  @Roles([Role.SYSTEM_ADMIN])
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  // find all shops controller
  @Get()
  @Roles([Role.SYSTEM_ADMIN])
  findAll() {
    return this.shopsService.findAll();
  }

  // find all shops related to a user (shopAdmin) controller
  @Get("user/:userId")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findAllByUserId(@Param("userId") userId: string) {
    return this.shopsService.findAllByUserId(userId);
  }

  // find a shop controller
  @Get(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findOne(@Param("id") id: string) {
    return this.shopsService.findOne(id);
  }

  // update shop controller
  @Patch(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  update(@Param("id") id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  // remove shop controller
  @Delete(":id")
  @Roles([Role.SYSTEM_ADMIN])
  remove(@Param("id") id: string) {
    return this.shopsService.remove(id);
  }
}
