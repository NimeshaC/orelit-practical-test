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
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product controller
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // find all products controller
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // find all products related to a shop controller
  @Get("shop/:shopId")
  findAllByShopId(@Param("shopId") shopId: string) {
    return this.productService.findAllByShopId(shopId);
  }

  // find a product controller
  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.productService.findOneById(id);
  }

  // update product controller
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // remove product controller
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
