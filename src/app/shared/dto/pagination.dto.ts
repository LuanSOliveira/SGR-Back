import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Número de itens por página (padrão: 10)',
    minimum: 1,
  })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página a ser retornada (padrão: 1)',
    minimum: 1,
  })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page: number = 1;
}
