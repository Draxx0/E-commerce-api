import { Category } from 'src/category/category.entity';
import { TimestampEntity } from 'src/generic/timestamp.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'integer' })
  price: number;

  @ManyToOne(() => Category)
  category: Category;
}
