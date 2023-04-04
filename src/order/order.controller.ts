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
// import { ProductCreateDTO } from '../dto/create-product.dto';
// import { ProductUpdateDTO } from '../dto/update-product.dto';
import { Order } from './order.entity';
import { DeleteResult } from 'typeorm';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllProducts(): Promise<Order[]> {
    return this.orderService.getAllProducts();
  }

  @Get(':id')
  getOneProductById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOneProductById(id);
  }

  @Post()
  createProduct(@Body() data: any): Promise<Order> {
    return this.orderService.createProduct(data);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: any): Promise<Order> {
    return this.orderService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderService.deleteProduct(id);
  }
}
