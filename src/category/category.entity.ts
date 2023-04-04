import { TimestampEntity } from 'src/generic/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;
}
