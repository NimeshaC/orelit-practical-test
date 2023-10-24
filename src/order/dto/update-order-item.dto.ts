import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateOrderItemDto {
  @IsString()
  @IsOptional()
  order_item_status: string;

  @IsString()
  @IsNotEmpty()
  order_id: string;
}
