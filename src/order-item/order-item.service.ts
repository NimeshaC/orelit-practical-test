import { Injectable } from "@nestjs/common";
import { CreateOrderItemDto } from "../order/entities/create-order-item.dto";
import { UpdateOrderItemDto } from "../order/entities/update-order-item.dto";

@Injectable()
export class OrderItemService {
  create(createOrderItemDto: CreateOrderItemDto) {
    return "This action adds a new orderItem";
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
