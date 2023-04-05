import { IsArray, IsString } from 'class-validator';
import { OrderItem } from 'src/order-item/order-item.entity';
import { User } from 'src/user/user.entity';

export class CreateOrderDto {
  @IsString()
  user: User;

  @IsArray()
  orderItems: OrderItem[];
}
