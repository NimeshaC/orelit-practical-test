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
import { array } from "joi";

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

  // create order item
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
        order_item_status: "Pending",
        quantity: quantity,
        gross_price: gross_price,
        product: product.data,
        order: order,
      });

      const orderItems = await this.orderItemRepository.find({
        where: { order: order },
      });

      const UpdatedQuantity =
        Number(product.data.stock_quantity) - parseInt(quantity);

      await this.productService.update(product.data.product_id, {
        stock_quantity: UpdatedQuantity.toString(),
      });

      return generateResponse(true, 200, "Order Item Created");
    } catch (error) {
      throw error;
    }
  }

  // create order
  async createOrder(
    createOrderDto: CreateOrderDto
  ): Promise<ResponseData<Order>> {
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

      cart.data.cartItems
        .map((cartItem: any) => cartItem)
        .forEach(async (item: any) => {
          await this.createOrderItem(
            {
              order_id: order.order_id,
              product_id: item.product.product_id,
              order_item_status: "Pending",
            },
            createOrderDto.cart_id,
            item.quantity,
            item.total_price
          );
        });

      const orderData = await this.findOrderById(order.order_id);

      await this.cartService.removeCart(createOrderDto.cart_id);
      return generateResponse(true, 200, "Order Created", orderData.data);
    } catch (error) {
      throw error;
    }
  }

  // find all orders
  async updateOrderItem(
    order_item_id: string,
    updateOrderItemDto: UpdateOrderDto
  ): Promise<ResponseData<OrderItem>> {
    try {
      const orderItem = await this.orderItemRepository.findOne({
        where: { order_item_id: order_item_id },
      });
      if (!orderItem) {
        throw new BadRequestException("Order Item not found");
      }

      const data = await this.orderItemRepository.save({
        ...orderItem,
        ...updateOrderItemDto,
      });

      return generateResponse(true, 200, "Order Item Updated", data);
    } catch (error) {
      throw error;
    }
  }

  // delete order
  async deleteOrder(order_id: string): Promise<ResponseData<Order>> {
    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: order_id },
      });
      if (!order) {
        throw new BadRequestException("Order not found");
      }

      await this.orderRepository.delete(order);

      return generateResponse(true, 200, "Order Deleted");
    } catch (error) {
      throw error;
    }
  }

  // find all orders
  async findAllOrderItemsByShopId(
    shop_id: string
  ): Promise<ResponseData<OrderItem[]>> {
    try {
      const orderItems = await this.orderItemRepository.find({
        where: { product: { shop: { shop_id: shop_id } } },
      });

      if (!orderItems) {
        throw new BadRequestException("Order Items not found");
      }

      return generateResponse(true, 200, "Order Items Found", orderItems);
    } catch (error) {
      throw error;
    }
  }

  // find a order
  async findOrderById(order_id: string): Promise<ResponseData<Order>> {
    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: order_id },
      });
      if (!order) {
        throw new BadRequestException("Order not found");
      }

      const orderItems = await this.orderItemRepository.find({
        where: { order: { order_id: order_id } },
      });

      const orderData = {
        ...order,
        orderItems,
      };

      return generateResponse(true, 200, "Order Found", orderData);
    } catch (error) {
      throw error;
    }
  }

  // find orders related to a user
  async findAllOrdersByUserId(user_id: string): Promise<ResponseData<Order[]>> {
    try {
      const orders = await this.orderRepository.find({
        where: { user: { user_id: user_id } },
      });

      if (!orders) {
        throw new BadRequestException("Orders not found");
      }

      // find order items related to an order and add them to the order object
      const orderItemsList = [];

      for (let i = 0; i < orders.length; i++) {
        const orderItems = await this.orderItemRepository.find({
          where: { order: { order_id: orders[i].order_id } },
        });

        const orderData = {
          ...orders[i],
          orderItems: orderItems,
        };

        orderItemsList.push(orderData);
      }

      return generateResponse(true, 200, "Orders Found", orderItemsList);
    } catch (error) {
      throw error;
    }
  }
}
