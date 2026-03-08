import { ApiProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/app/shared/dto/entityResponseDto';

export class ProfileResponseDto extends EntityResponseDto {
  @ApiProperty({ example: 'Admin' })
  name: string;

  @ApiProperty({ example: 'gerenciamento' })
  path: string;
}
