import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { jwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/authorization/role.guard";
import { Roles } from "src/auth/authorization/roles.decorator";
import { Role } from "src/auth/authorization/roles.enum";

@Controller("order")
@UseGuards(jwtAuthGuard)
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // create order controller
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  // find all orders related to a shop controller
  @Get("shop/:shop_id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  findAllOrderItemsByShopId(@Param("shop_id") shop_id: string) {
    return this.orderService.findAllOrderItemsByShopId(shop_id);
  }

  // find a order controller
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOrderById(id);
  }

  // find all orders related to a user controller
  @Get("user/:user_id")
  findAllOrdersByUserId(@Param("user_id") user_id: string) {
    return this.orderService.findAllOrdersByUserId(user_id);
  }

  // update order item controller
  @Patch("item/:id")
  @Roles([Role.SYSTEM_ADMIN, Role.SHOP_ADMIN])
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrderItem(id, updateOrderDto);
  }

  // remove order controller
  @Delete(":id")
  @Roles([Role.SYSTEM_ADMIN])
  remove(@Param("id") id: string) {
    return this.orderService.deleteOrder(id);
  }
}
