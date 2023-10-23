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
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";

@Controller("shop")
export class ShopController {
  constructor(private readonly shopsService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get("user/:userId")
  findAllByUserId(@Param("userId") userId: string) {
    return this.shopsService.findAllByUserId(userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.shopsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.shopsService.remove(id);
  }
}
