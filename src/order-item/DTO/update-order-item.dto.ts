import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from 'src/order/DTO/create-order.dto';
export class UpdateOrderItemDto extends PartialType(CreateOrderDto) {}
