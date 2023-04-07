import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './DTO/create-order.dto';
import { JwtService } from '@nestjs/jwt';
import { Product } from 'src/product/product.entity';
import { Request } from 'express';

Injectable();
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  async getAllOrder() {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('order.user', 'user')
      .getMany();
  }

  async createOrder(data: CreateOrderDto, req: Request): Promise<Order> {
    try {
      const signedJwtAccessToken: string =
        req.headers.authorization.split(' ')[1];
      const decodedJwtAccessToken: any =
        this.jwtService.decode(signedJwtAccessToken);
      data.user = decodedJwtAccessToken;
      const product = await this.productRepository.findOneBy({
        id: data.orderItems[0].product.id,
      });
      const order = await this.orderRepository.save(data);
      order.totalPrice = product.price * data.orderItems[0].quantity;
      return await this.orderRepository.save(order);
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
