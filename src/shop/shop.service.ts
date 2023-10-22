import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shop } from "./entities/shop.entity";
import { ResponseData, generateResponse } from "src/utility/response.utill";
import { UserService } from "src/user/user.service";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    private userService: UserService
  ) {}

  async create(
    createShopDto: CreateShopDto,
    userId: string
  ): Promise<ResponseData<Shop>> {
    try {
      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new BadRequestException("User not found");
      }

      const shop = await this.shopRepository.save({
        ...createShopDto,
        user: user.data,
      });
      return generateResponse(true, 200, "Shop created successfully");
    } catch (error) {
      if (error.code == "23505") {
        throw new BadRequestException("Shop already exists");
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseData<Shop[]>> {
    const shop = await this.shopRepository.find();
    return generateResponse(true, 200, "All Shops", shop);
  }

  async findAllByUserId(userId: string): Promise<ResponseData<Shop[]>> {
    try {
      const user = await this.userService.findOneById(userId);
      if (!user) {
        throw new BadRequestException("User not found");
      }
      const shop = await this.shopRepository.find({
        where: { user: { user_id: userId } },
      });
      return generateResponse(true, 200, "All Shops", shop);
    } catch (error) {
      throw error;
    }
  }

  async findOne(shop_id: string): Promise<ResponseData<Shop>> {
    try {
      const shop = await this.shopRepository.findOne({
        where: { shop_id },
      });
      if (!shop) {
        throw new BadRequestException("Shop not found");
      }
      return generateResponse(true, 200, "Shop", shop);
    } catch (error) {
      throw error;
    }
  }

  async update(
    shop_id: string,
    updateShopDto: UpdateShopDto
  ): Promise<ResponseData<Shop | null>> {
    try {
      const shop = await this.shopRepository.findOne({
        where: { shop_id },
      });
      if (!shop) {
        throw new BadRequestException("Shop not found");
      }
      const updatedShop = await this.shopRepository.save({
        ...shop,
        ...updateShopDto,
      });
      return generateResponse(
        true,
        200,
        "Shop updated successfully",
        updatedShop
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(shop_id: string): Promise<ResponseData<Shop | null>> {
    try {
      const shop = await this.shopRepository.findOne({
        where: { shop_id },
      });
      if (!shop) {
        throw new BadRequestException("Shop not found");
      }
      await this.shopRepository.delete({ shop_id });
      return generateResponse(true, 200, "Shop deleted successfully", null);
    } catch (error) {
      throw error;
    }
  }
}
