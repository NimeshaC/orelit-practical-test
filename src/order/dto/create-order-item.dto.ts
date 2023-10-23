import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsOptional()
  order_item_status: string;

  @IsString()
  @IsNotEmpty()
  order_id: string;
}
