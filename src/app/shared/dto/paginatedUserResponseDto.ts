import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "./userResponseDto";

export class PaginatedUserResponseDto {
  @ApiProperty({ type: UserResponseDto, isArray: true })
  data: UserResponseDto[];

  @ApiProperty({ example: 50 })
  total: number;

  @ApiProperty({ example: 5 })
  totalPages: number;

  @ApiProperty({ example: 1 })
  currentPage: number;
}