import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  product_description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  stock_quantity: string;

  @IsString()
  @IsOptional()
  product_image: string;

  @IsString()
  @IsNotEmpty()
  product_code: string;

  @IsString()
  @IsOptional()
  discounted_price: string | null;
}
