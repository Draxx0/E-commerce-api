import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './DTO/create-order-item.dto';
import { UpdateOrderItemDto } from './DTO/update-order-item.dto';
import { Order } from 'src/order/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrderItems() {
    return await this.orderItemRepository.find();
  }

  async getOrderItemById(id: string) {
    return await this.orderItemRepository.findOneBy({ id });
  }

  async updateOrderItem(id: string, data: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('orderItem.id = :id', { id })
      .getOne();

    const order = await this.orderRepository.findOneBy({
      id: orderItem.order.id,
    });

    const newOrderItem = {
      ...orderItem,
      quantity: parseInt(data.quantity as string),
      updatedAt: new Date(),
    };

    const newOrder = {
      ...order,
      totalPrice: parseInt(data.quantity as string) * orderItem.product.price,
      updatedAt: new Date(),
    };

    await this.orderRepository.update(order.id, newOrder);

    return await this.orderItemRepository.save(newOrderItem);
  }

  async createOrderItem(data: CreateOrderItemDto) {
    return await this.orderItemRepository.save(data);
  }

  async deleteOrderItem(id: string, orderId: string) {
    const orderItem = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('orderItem.id = :id', { id })
      .getOne();
    const order = await this.orderRepository.findOneBy({ id: orderId });

    const newOrder = {
      ...order,
      totalPrice:
        order.totalPrice - orderItem.quantity * orderItem.product.price,
    };

    await this.orderRepository.update(order.id, newOrder);

    return await this.orderItemRepository.delete(id);
  }
}
