import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  
  @ApiProperty({
    example: 'Natanael Soares Lima Junior',
    description: 'Login único do usuário',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: '123456789',
    description: 'Senha do usuário',
    minLength: 5,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  password: string;

  @ApiProperty({
    example: 'Admin',
    description: 'Perfil do usuário'
  })
  @IsString()
  @IsNotEmpty()
  profile: string;
}
