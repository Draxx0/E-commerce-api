import { TimestampEntity } from 'src/generic/timestamp.entity';
import { Order } from 'src/order/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { userRole } from './user.role.enum';

@Entity('user')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', default: 'user' })
  role: userRole;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
