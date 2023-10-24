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
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { RolesGuard } from "src/auth/authorization/role.guard";
import { jwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Role } from "src/auth/authorization/roles.enum";
import { Roles } from "src/auth/authorization/roles.decorator";

@Controller("product")
@UseGuards(jwtAuthGuard)
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product controller
  @Post()
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // find all products controller
  @Get()
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findAll() {
    return this.productService.findAll();
  }

  // find all products related to a shop controller
  @Get("shop/:shopId")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findAllByShopId(@Param("shopId") shopId: string) {
    return this.productService.findAllByShopId(shopId);
  }

  // find a product controller
  @Get(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findOneById(@Param("id") id: string) {
    return this.productService.findOneById(id);
  }

  // update product controller
  @Patch(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // remove product controller
  @Delete(":id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
