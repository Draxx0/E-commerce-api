import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { ProductCreateDTO } from '../dto/create-product.dto';
// import { ProductUpdateDTO } from '../dto/update-product.dto';
import { Product } from './product.entity';
import { DeleteResult } from 'typeorm';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getOneProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getOneProductById(id);
  }

  @Post()
  createProduct(@Body() data: any): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: any): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }
}
