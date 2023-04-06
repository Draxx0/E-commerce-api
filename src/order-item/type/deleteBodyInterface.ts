import { User } from 'src/user/user.entity';
import { OrderItem } from '../order-item.entity';

export interface IDeleteBodyInterface {
  id: string;
  status: 'INCARD';
  user: User;
  totalPrice: number;
  orderItems: OrderItem[];
}
