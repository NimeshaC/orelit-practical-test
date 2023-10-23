import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";
import { CartService } from "src/cart/cart.service";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { ResponseData, generateResponse } from "src/utility/response.utill";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private cartService: CartService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
    cart_id: string,
    quantity: string,
    gross_price: string
  ): Promise<ResponseData<OrderItem>> {
    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: createOrderItemDto.order_id },
      });
      if (!order) {
        throw new BadRequestException("Order not found");
      }

      const cart = await this.cartService.findCartById(cart_id);

      if (!cart) {
        throw new BadRequestException("Cart not found");
      }

      const product = await this.productService.findOneById(
        createOrderItemDto.product_id
      );

      if (!product) {
        throw new BadRequestException("Product not found");
      }

      const data = await this.orderItemRepository.save({
        order_item_status: "Success",
        quantity: quantity,
        gross_price: gross_price,
        product: product.data,
        order: order,
      });

      console.log(data, "data............");

      const orderItems = await this.orderItemRepository.find({
        where: { order: order },
      });

      console.log(orderItems, "orderItems............");

      return generateResponse(true, 200, "Order Item Created");
    } catch (error) {
      throw error;
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<ResponseData<Order>> {
    try {
      const cart = await this.cartService.findCartById(createOrderDto.cart_id);
      if (!cart) {
        throw new BadRequestException("Cart not found");
      }

      const user = await this.userService.findOneById(createOrderDto.user_id);
      if (!user) {
        throw new BadRequestException("User not found");
      }

      const order = await this.orderRepository.save({
        ...createOrderDto,
        order_date:
          new Date().getFullYear() +
          "-" +
          new Date().getMonth() +
          "-" +
          new Date().getDate(),
        order_total: cart.data.total_price,
        total_quantity: cart.data.total_quantity,
        user: user.data,
      });

      console.log(order, "order................");

      // console.log(
      //   cart.data.cartItems
      //     .map((cartItem: any) => cartItem)
      //     .forEach((item) => {
      //       console.log(item, "item............");
      //     }),
      //   "cartItems............"
      // );

      cart.data.cartItems
        .map((cartItem: any) => cartItem)
        .forEach(async (item: any) => {
          console.log(item, "Item............");

          await this.createOrderItem(
            {
              order_id: order.order_id,
              product_id: item.product.product_id,
              order_item_status: "Success",
            },
            createOrderDto.cart_id,
            item.quantity,
            item.total_price
          );
        });

      console.log("order created............");

      return generateResponse(true, 200, "Order Created");

      // await this.cartService.removeCart(createOrderDto.cart_id);

      // await this.cartService.deleteCart(createOrderDto.user.user_id);
    } catch (error) {
      throw error;
    }
  }
}
