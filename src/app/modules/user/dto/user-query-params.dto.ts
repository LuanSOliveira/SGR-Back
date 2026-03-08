import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/app/shared/dto/pagination.dto';

export class UserQueryParamsDto extends PaginationDto {
  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Filtro por id do perfil',
  })
  @IsString()
  @IsOptional()
  profileId?: string;

  @ApiPropertyOptional({
    example: 'Luan',
    description: 'Filtro por nome',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
