import { TimestampEntity } from 'src/generic/timestamp.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('category')
export class Category extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
