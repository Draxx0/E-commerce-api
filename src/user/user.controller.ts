import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import { DeleteResult } from 'typeorm';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getOneUserById(id);
  }

  @Post()
  createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
