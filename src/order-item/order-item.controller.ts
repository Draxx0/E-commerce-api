import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';
import { CreateOrderItemDto } from './DTO/create-order-item.dto';
import { DeleteResult } from 'typeorm';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  getAllOrderItems(): Promise<OrderItem[]> {
    return this.orderItemService.getAllOrderItems();
  }

  @Post()
  createOrderItem(@Body() data: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(data);
  }

  @Delete(':id')
  deleteOrderItem(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderItemService.deleteOrderItem(id);
  }
}
