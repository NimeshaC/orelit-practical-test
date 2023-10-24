import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { ResponseData, generateResponse } from "src/utility/response.utill";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { PromotionService } from "src/promotion/promotion.service";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { CartItem } from "./entities/cart-item.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    readonly userService: UserService,
    private productService: ProductService,
    private promotionService: PromotionService
  ) {}

  // create cart item
  async createCartItem(
    createCartItemDto: CreateCartItemDto
  ): Promise<ResponseData<CartItem | undefined>> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { cart_id: createCartItemDto.cart_id },
      });
      const product = await this.productService.findOneById(
        createCartItemDto.product_id
      );

      if (!product) {
        throw new BadRequestException("Product not found");
      }

      const getPromotions = await this.promotionService.findAllByProductId(
        createCartItemDto.product_id
      );

      const activePromotion = getPromotions.data.filter((promotion) => {
        const startDate = new Date(promotion.promotion_start_date);
        const endDate = new Date(promotion.promotion_end_date);
        const currentDate = new Date();
        return startDate <= currentDate && endDate >= currentDate;
      });

      const discountedProductPrice = activePromotion.map((promotion) => {
        return (
          Number(product.data.price) -
          (Number(product.data.price) * Number(promotion.discount_percentage)) /
            100
        );
      });

      const totalPrice = () => {
        if (getPromotions.data.length > 0) {
          return discountedProductPrice[0] * Number(createCartItemDto.quantity);
        } else {
          return (
            Number(product.data.price) * Number(createCartItemDto.quantity)
          );
        }
      };

      await this.cartItemRepository.save({
        ...createCartItemDto,
        total_price: totalPrice().toString(),
        cart: cart,
        product: product.data,
      });

      return generateResponse(true, 200, " CartItem created successfully");
    } catch (error) {
      throw error;
    }
  }

  // find  cart item
  async updateCartItem(
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto
  ): Promise<ResponseData<CartItem | undefined>> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { cart_item_id: cartItemId },
      });
      if (!cartItem) {
        throw new BadRequestException("CartItem not found");
      }

      const product = await this.productService.findOneById(
        updateCartItemDto.product_id
      );

      if (!product) {
        throw new BadRequestException("Product not found");
      }

      const getPromotions = await this.promotionService.findAllByProductId(
        updateCartItemDto.product_id
      );

      const activePromotion = getPromotions.data.filter((promotion) => {
        const startDate = new Date(promotion.promotion_start_date);
        const endDate = new Date(promotion.promotion_end_date);
        const currentDate = new Date();
        return startDate <= currentDate && endDate >= currentDate;
      });

      const discountedProductPrice = activePromotion.map((promotion) => {
        return (
          Number(product.data.price) -
          (Number(product.data.price) * Number(promotion.discount_percentage)) /
            100
        );
      });

      const totalPrice = () => {
        if (getPromotions.data.length > 0) {
          return (
            discountedProductPrice[0] * Number(updateCartItemDto.quantity) +
            Number(cartItem.total_price)
          );
        } else {
          return (
            Number(product.data.price) * Number(updateCartItemDto.quantity) +
            Number(cartItem.total_price)
          );
        }
      };

      const totalQuantity =
        Number(updateCartItemDto.quantity) + Number(cartItem.quantity);

      const updatedCartItem = await this.cartItemRepository.update(
        { cart_item_id: cartItemId },
        {
          ...updateCartItemDto,
          total_price: totalPrice().toString(),
          quantity: totalQuantity.toString(),
        }
      );

      return generateResponse(true, 200, " CartItem updated successfully");
    } catch (error) {
      throw error;
    }
  }

  // create cart
  async createCart(
    createCartDto: CreateCartDto
  ): Promise<ResponseData<Cart | undefined>> {
    try {
      const user = await this.userService.findOneById(createCartDto.user_id);
      if (!user) {
        throw new BadRequestException("User not found");
      }

      const cart = await this.cartRepository.save({
        ...createCartDto,
        user: user.data,
      });

      await this.createCartItem({
        cart_id: cart.cart_id,
        product_id: createCartDto.product_id,
        quantity: createCartDto.quantity,
      });

      const cartData = await this.findCartById(cart.cart_id);

      const totalPrice = cartData.data.cartItems
        .map((item: any) => {
          return Number(item.total_price);
        })
        .reduce((acc: any, item: any) => acc + item, 0);

      const totalQuantity = cartData.data.cartItems
        .map((item: any) => {
          return Number(item.quantity);
        })
        .reduce((acc: any, item: any) => acc + item, 0);

      const data = await this.cartRepository.update(
        { cart_id: cart.cart_id },
        {
          total_price: totalPrice.toString(),
          total_quantity: totalQuantity.toString(),
        }
      );

      const updatedCartData = await this.findCartById(cart.cart_id);

      return generateResponse(
        true,
        200,
        " Cart created successfully",
        updatedCartData.data
      );
    } catch (error) {
      throw error;
    }
  }

  // find cart by id
  async findCartById(cartId: string): Promise<ResponseData<Cart | any>> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { cart_id: cartId },
      });
      if (!cart) {
        throw new BadRequestException("Cart not found");
      }

      const cartItems = await this.cartItemRepository.find({
        where: { cart: { cart_id: cartId } },
      });

      const cartData = {
        ...cart,
        cartItems,
      };

      return generateResponse(true, 200, "Cart found", cartData);
    } catch (error) {
      throw error;
    }
  }

  // update cart
  async updateCart(
    cartId: string,
    updateCartDto: UpdateCartDto
  ): Promise<ResponseData<Cart | undefined>> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { cart_id: cartId },
      });
      if (!cart) {
        throw new BadRequestException("Cart not found");
      }

      const user = await this.userService.findOneById(updateCartDto.user_id);
      if (!user) {
        throw new BadRequestException("User not found");
      }

      const existing = await this.cartItemRepository.findOne({
        where: {
          cart: { cart_id: cartId },
          product: { product_id: updateCartDto.product_id },
        },
      });

      if (existing) {
        await this.updateCartItem(existing.cart_item_id, {
          quantity: updateCartDto.quantity,
        });
      } else {
        await this.createCartItem({
          cart_id: cart.cart_id,
          product_id: updateCartDto.product_id,
          quantity: updateCartDto.quantity,
        });
      }

      const cartData = await this.findCartById(cart.cart_id);

      const totalPrice = cartData.data.cartItems
        .map((item: any) => {
          return Number(item.total_price);
        })
        .reduce((acc: any, item: any) => acc + item, 0);

      const totalQuantity = cartData.data.cartItems
        .map((item: any) => {
          return Number(item.quantity);
        })
        .reduce((acc: any, item: any) => acc + item, 0);

      const data = await this.cartRepository.update(
        { cart_id: cart.cart_id },
        {
          total_price: totalPrice.toString(),
          total_quantity: totalQuantity.toString(),
        }
      );

      const updatedCartData = await this.findCartById(cart.cart_id);

      return generateResponse(
        true,
        200,
        " Cart updated successfully",
        updatedCartData.data
      );
    } catch (error) {
      throw error;
    }
  }

  // remove cart item
  async removeCartItem(
    cartItemId: string
  ): Promise<ResponseData<CartItem | undefined>> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { cart_item_id: cartItemId },
      });
      if (!cartItem) {
        throw new BadRequestException("CartItem not found");
      }
      await this.cartItemRepository.delete({
        cart_item_id: cartItemId,
      });

      const updatedCartData = await this.findCartById(cartItem.cart.cart_id);

      return generateResponse(
        true,
        200,
        "CartItem deleted successfully",
        updatedCartData.data
      );
    } catch (error) {
      throw error;
    }
  }

  // remove whole cart
  async removeCart(cartId: string): Promise<ResponseData<Cart | undefined>> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { cart_id: cartId },
      });
      if (!cart) {
        throw new BadRequestException("Cart not found");
      }
      await this.cartRepository.delete({
        cart_id: cartId,
      });

      const cartData = await this.findCartById(cart.cart_id);

      return generateResponse(
        true,
        200,
        "Cart deleted successfully",
        cartData.data
      );
    } catch (error) {
      throw error;
    }
  }
}
