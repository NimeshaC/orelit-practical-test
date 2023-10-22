import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";

@Controller("shops")
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
