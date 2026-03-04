import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/app/shared/dto/pagination.dto';

export class UserQueryParamsDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'Admin',
    description: 'Filtro por profile',
  })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiPropertyOptional({
    example: 'Luan',
    description: 'Filtro por nome',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
