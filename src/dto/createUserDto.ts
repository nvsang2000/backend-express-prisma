import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
