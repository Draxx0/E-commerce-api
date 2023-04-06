import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { statusEnum } from './order.type';
import { TimestampEntity } from 'src/generic/timestamp.entity';
import { User } from 'src/user/user.entity';
import { OrderItem } from 'src/order-item/order-item.entity';

@Entity('order')
export class Order extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: statusEnum, default: statusEnum.INCARD })
  status: statusEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
