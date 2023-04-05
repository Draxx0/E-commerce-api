import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { UpdateCategoryDto } from './DTO/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating category');
    }
  }

  async getAllCategory() {
    return await this.categoryRepository.find();
  }

  async getOneCategory(id: string) {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting category');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
