import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  shop_name: string;

  @IsString()
  @IsNotEmpty()
  shop_phone: string;

  @IsString()
  @IsNotEmpty()
  shop_address: string;
}
