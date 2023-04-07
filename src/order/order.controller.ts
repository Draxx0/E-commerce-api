import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { DeleteResult } from 'typeorm';
import { CreateOrderDto } from './DTO/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() data: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(data);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderService.deleteOrder(id);
  }
}
