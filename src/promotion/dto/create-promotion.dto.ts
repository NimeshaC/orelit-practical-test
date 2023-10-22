import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
  promotion_discount: string;

  @IsString()
  @IsOptional()
  shop_id: string;
}
