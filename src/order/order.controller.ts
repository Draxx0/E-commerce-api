import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { DeleteResult } from 'typeorm';
import { CreateOrderDto } from './DTO/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

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
  createProduct(
    @Body() data: CreateOrderDto,
    @Req() req: Request,
  ): Promise<Order> {
    return this.orderService.createOrder(data, req);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderService.deleteOrder(id);
  }
}
