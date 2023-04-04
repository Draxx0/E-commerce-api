import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { statusEnum } from './order.type';
import { TimestampEntity } from 'src/generic/timestamp.entity';

@Entity('order')
export class Order extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: statusEnum, default: statusEnum.PROGRESS })
  status: statusEnum;

  @Column({ type: 'varchar' })
  orderId: string;

  @Column({ type: 'varchar' })
  productId: string;

  @Column({ type: 'integer' })
  quantity: number;
}
