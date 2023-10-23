import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.cartService.findCartById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Delete(":id")
  removeCart(@Param("id") id: string) {
    return this.cartService.removeCart(id);
  }

  @Delete("/item/:id")
  removeCartItem(@Param("id") id: string) {
    return this.cartService.removeCartItem(id);
  }
}
