import { IsString, IsEmail } from 'class-validator';
import { userRole } from '../user.role.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  role: userRole;
}
