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
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .getMany();
  }

  async createProduct(data: CreateProductDto) {
    try {
      const product = this.productRepository.create(data);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneProductById(id: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .getOne();
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    const productUpdate = { ...product, ...data, updated_at: new Date() };
    return await this.productRepository.save(productUpdate);
  }
  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
