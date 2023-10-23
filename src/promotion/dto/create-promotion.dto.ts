import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  promotion_name: string;

  @IsString()
  @IsNotEmpty()
  promotion_description: string;

  @IsString()
  @IsNotEmpty()
  promotion_start: string;

  @IsString()
  @IsNotEmpty()
  promotion_end: string;

  @IsString()
  @IsNotEmpty()
  discount_percentage: string;

  @IsString()
  @IsOptional()
  product_id: string;

  @IsString()
  @IsOptional()
  user_id: string;
}
