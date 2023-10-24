import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;
}
