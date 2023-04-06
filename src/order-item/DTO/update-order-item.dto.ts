import { IsOptional, IsString } from 'class-validator';
import { Product } from 'src/product/product.entity';

export class UpdateOrderItemDto {
  @IsString()
  id: string;

  @IsString()
  quantity: string | number;

  @IsString()
  product: Product;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date | null;

  @IsOptional()
  deletedAt: Date | null;
}
