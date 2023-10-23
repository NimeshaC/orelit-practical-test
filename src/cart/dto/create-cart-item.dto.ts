import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCartItemDto {
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  cart_id: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;
}
