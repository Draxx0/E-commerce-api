import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
// import { ProductCreateDTO } from '../dto/create-product.dto';
// import { ProductUpdateDTO } from '../dto/update-product.dto';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async createProduct(data: any) {
    try {
      return this.productRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneProductById(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async updateProduct(id: string, data: any) {
    const product = await this.productRepository.findOneBy({ id });
    const productUpdate = { ...product, ...data };

    await this.productRepository.save(productUpdate);

    return productUpdate;
  }
  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
