import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  shop_name: string;

  @IsString()
  @IsNotEmpty()
  shop_phone: string;

  @IsString()
  @IsOptional()
  admin_id: string;
}
