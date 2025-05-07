import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;
  @IsString()
  username: string;
  @IsString()
  @MinLength(6)
  password: string;
}
