import { TimestampEntity } from 'src/generic/timestamp.entity';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order-item')
export class OrderItem extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Order, { onDelete: 'SET NULL' })
  order: Order;

  @ManyToOne(() => Product)
  product: Product;
}
