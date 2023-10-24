import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get("shop/:shop_id")
  findAllOrderItemsByShopId(@Param("shop_id") shop_id: string) {
    return this.orderService.findAllOrderItemsByShopId(shop_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOrderById(id);
  }

  @Get("user/:user_id")
  findAllOrdersByUserId(@Param("user_id") user_id: string) {
    return this.orderService.findAllOrdersByUserId(user_id);
  }

  @Patch("item/:id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrderItem(id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderService.deleteOrder(id);
  }
}
