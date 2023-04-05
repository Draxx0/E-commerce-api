import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './DTO/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async getAllOrderItems() {
    return await this.orderItemRepository.find();
  }

  async createOrderItem(data: CreateOrderItemDto) {
    return await this.orderItemRepository.save(data);
  }

  async deleteOrderItem(id: string) {
    return await this.orderItemRepository.delete(id);
  }
}
