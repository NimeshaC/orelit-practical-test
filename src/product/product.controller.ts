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

type QueryIds = {
  shopId: string;
  userId: string;
};

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Query() QueryIds: QueryIds
  ) {
    const { shopId, userId } = QueryIds;
    return this.productService.create(createProductDto, shopId, userId);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("shop/:shopId")
  findAllByShopId(@Param("shopId") shopId: string) {
    return this.productService.findAllByShopId(shopId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
