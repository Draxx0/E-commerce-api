import { IsInt, IsString } from 'class-validator';
import { Category } from 'src/category/category.entity';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsInt()
  price: number;

  @IsString()
  category: Category;
}
