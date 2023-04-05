import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './DTO/create-order.dto';
import { UpdateOrderDto } from './DTO/update-order.dto';

Injectable();
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrder() {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .getMany();
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    try {
      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneOrderById(id: string) {
    return await this.orderRepository.findOneBy({ id });
  }

  // async updateOrder(id: string, data: UpdateOrderDto) {
  //   const product = await this.orderRepository.findOneBy({ id });
  //   const productUpdate = { ...product, ...data };

  //   await this.orderRepository.save(productUpdate);

  //   return productUpdate;
  // }

  async deleteOrder(id: string) {
    return await this.orderRepository.delete(id);
  }
}
