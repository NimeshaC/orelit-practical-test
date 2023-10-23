import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
