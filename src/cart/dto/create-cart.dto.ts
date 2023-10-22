import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  cart_id: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  product_id: string;
}
