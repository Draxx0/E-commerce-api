import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { DeleteResult } from 'typeorm';
import { CreateOrderDto } from './DTO/create-order.dto';
import { UpdateOrderDto } from './DTO/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllProducts(): Promise<Order[]> {
    return this.orderService.getAllOrder();
  }

  @Get(':id')
  getOneProductById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOneOrderById(id);
  }

  @Post()
  createProduct(@Body() data: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(data);
  }

  // @Put(':id')
  // updateProduct(
  //   @Param('id') id: string,
  //   @Body() data: UpdateOrderDto,
  // ): Promise<Order> {
  //   return this.orderService.updateOrder(id, data);
  // }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderService.deleteOrder(id);
  }
}
