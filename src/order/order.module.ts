import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { User } from 'src/user/user.entity';
import { OrderItem } from 'src/order-item/order-item.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, OrderItem]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
