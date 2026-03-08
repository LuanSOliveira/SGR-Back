import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'natanaeljr',
    description: 'Login único do usuário',
    minLength: 5,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  login: string;

  @ApiProperty({
    example: '123456789',
    description: 'Senha do usuário',
    minLength: 5,
    maxLength: 128,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({
    example: 'Natanael Soares Lima Junior',
    description: 'Nome completo do usuario',
    minLength: 5,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do perfil (UUID) vinculado ao usuário',
  })
  @IsUUID()
  @IsNotEmpty()
  profileId: string;
}
