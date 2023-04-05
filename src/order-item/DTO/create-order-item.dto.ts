import { IsInt, IsString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';

export class CreateOrderItemDto {
  @IsInt()
  quantity: number;

  @IsString()
  order: Order;

  @IsString()
  product: Product;
}
