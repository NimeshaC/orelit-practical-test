import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { RolesGuard } from "src/auth/authorization/role.guard";
import { Role } from "src/auth/authorization/roles.enum";
import { Roles } from "src/auth/authorization/roles.decorator";
import { jwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("cart")
@UseGuards(jwtAuthGuard)
@UseGuards(RolesGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // create cart controller
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  // find a cart controller
  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.cartService.findCartById(id);
  }

  // update cart controller
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(id, updateCartDto);
  }

  // remove cart controller
  @Delete(":id")
  removeCart(@Param("id") id: string) {
    return this.cartService.removeCart(id);
  }

  // remove cart item controller
  @Delete("/item/:id")
  removeCartItem(@Param("id") id: string) {
    return this.cartService.removeCartItem(id);
  }
}
