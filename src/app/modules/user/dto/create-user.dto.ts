import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserProfile } from '../entities/user.entity';

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
    enum: UserProfile,
    example: UserProfile.garçom,
    description: 'Perfil do usuário'
  })
  @IsEnum(UserProfile)
  @IsNotEmpty()
  profile: UserProfile;
}

