import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
// import { ProductCreateDTO } from '../dto/create-product.dto';
// import { ProductUpdateDTO } from '../dto/update-product.dto';

Injectable();
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllProducts() {
    return await this.orderRepository.find();
  }

  async createProduct(data: any) {
    try {
      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneProductById(id: string) {
    return await this.orderRepository.findOneBy({ id });
  }

  async updateProduct(id: string, data: any) {
    const product = await this.orderRepository.findOneBy({ id });
    const productUpdate = { ...product, ...data };

    await this.orderRepository.save(productUpdate);

    return productUpdate;
  }
  async deleteProduct(id: string) {
    return await this.orderRepository.delete(id);
  }
}
