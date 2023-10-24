import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { ShopService } from "src/shop/shop.service";
import { UserService } from "src/user/user.service";
import { ResponseData, generateResponse } from "src/utility/response.utill";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private shopService: ShopService,
    readonly userService: UserService
  ) {}

  // create product
  async create(
    createProductDto: CreateProductDto
  ): Promise<ResponseData<Product>> {
    try {
      const user = await this.userService.findOneById(createProductDto.user_id);
      if (!user) {
        throw new BadRequestException("User not found");
      }

      const shop = await this.shopService.findOne(createProductDto.shop_id);
      if (!shop.data) {
        throw new BadRequestException("Shop not found");
      }
      await this.productRepository.save({
        ...createProductDto,
        shop: shop.data,
        user: user.data,
      });
      return generateResponse(true, 200, " Product created successfully");
    } catch (error) {
      if (error.code == "23505") {
        throw new BadRequestException("Product already exists");
      }
      throw error;
    }
  }

  // find all products
  async findAll(): Promise<ResponseData<Product[]>> {
    const product = await this.productRepository.find();
    return generateResponse(true, 200, "All Products", product);
  }

  // find all products related to a shop
  async findAllByShopId(shopId: string): Promise<ResponseData<Product[]>> {
    try {
      const shop = await this.shopService.findOne(shopId);
      if (!shop.data) {
        throw new BadRequestException("Shop not found");
      }
      const product = await this.productRepository.find({
        where: { shop: { shop_id: shopId } },
      });
      return generateResponse(true, 200, "All Products", product);
    } catch (error) {
      throw error;
    }
  }

  // find one product
  async findOneById(product_id: string): Promise<ResponseData<Product>> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      if (!product) {
        throw new BadRequestException("Product not found");
      }
      return generateResponse(true, 200, "Product", product);
    } catch (error) {
      throw error;
    }
  }

  // update product
  async update(
    product_id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ResponseData<Product | null>> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      if (!product) {
        throw new BadRequestException("Product not found");
      }
      const updatedProduct = await this.productRepository.save({
        ...product,
        ...updateProductDto,
      });
      return generateResponse(
        true,
        200,
        "Product updated successfully",
        updatedProduct
      );
    } catch (error) {
      throw error;
    }
  }

  // remove product
  async remove(product_id: string): Promise<ResponseData<Product | null>> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      if (!product) {
        throw new BadRequestException("Product not found");
      }
      await this.productRepository.delete({ product_id });
      return generateResponse(true, 200, "Product deleted successfully");
    } catch (error) {
      throw error;
    }
  }
}
