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

  // create order controller
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  // find all orders related to a shop controller
  @Get("shop/:shop_id")
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
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrderItem(id, updateOrderDto);
  }

  // remove order controller
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderService.deleteOrder(id);
  }
}
