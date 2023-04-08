import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .getMany();
  }

  async getOneUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async getOneUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async createUser(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      return await this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });
    const { username, email, address } = user;
    try {
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
      }

      const newPass: UpdateUserDTO = {
        username: data.username || username,
        email: data.email || email,
        address: data.address || address,
        password: data.password,
        updatedAt: new Date(),
        id: user.id,
      };

      const payload: UpdateUserDTO = {
        username: data.username || username,
        email: data.email || email,
        address: data.address || address,
        updatedAt: new Date(),
        id: user.id,
      };

      console.log(payload);

      await this.userRepository.update(id, data.password ? newPass : payload);
      return {
        access_token: await this.jwtService.signAsync(
          data.password ? newPass : payload,
        ),
      };
    } catch (error) {
      console.log(error);
      throw new Error('Error while updating article');
    }
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
