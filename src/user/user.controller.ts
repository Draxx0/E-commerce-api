import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/create-user.dto';

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
    console.log('from controller');
    return this.userService.createUser(data);
  }
}
