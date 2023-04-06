import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';
import { CreateOrderItemDto } from './DTO/create-order-item.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateOrderItemDto } from './DTO/update-order-item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  getAllOrderItems(): Promise<OrderItem[]> {
    return this.orderItemService.getAllOrderItems();
  }

  @Get(':id')
  getOneOrderItem(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemService.getOrderItemById(id);
  }

  @Post()
  createOrderItem(@Body() data: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(data);
  }

  @Delete(':id')
  deleteOrderItem(
    @Param('id') id: string,
    orderId: string,
  ): Promise<DeleteResult> {
    return this.orderItemService.deleteOrderItem(id, orderId);
  }

  @Put(':id')
  updateOrderItem(
    @Param('id') id: string,
    @Body() data: UpdateOrderItemDto,
  ): Promise<UpdateOrderItemDto> {
    return this.orderItemService.updateOrderItem(id, data);
  }
}
