import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Nome único do perfil de usuário',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'gerenciamento',
    description: 'Nome da rota de redirecionamento após login',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  path: string;
}
