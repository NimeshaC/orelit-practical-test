import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  cart_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  payment_method: number;

  @IsString()
  @IsNotEmpty()
  order_address: string;

  @IsString()
  @IsNotEmpty()
  order_phone: string;
}
