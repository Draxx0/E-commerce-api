import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from 'src/category/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async createProduct(data: CreateProductDto) {
    try {
      const category = await this.categoryRepository.findOneBy({
        id: data.categoryId,
      });

      if (!category) {
        throw new Error('Category not found');
      }

      const product = this.productRepository.create({
        ...data,
        category,
      });

      return this.productRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneProductById(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    const productUpdate = { ...product, ...data };

    await this.productRepository.save(productUpdate);

    return productUpdate;
  }
  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
