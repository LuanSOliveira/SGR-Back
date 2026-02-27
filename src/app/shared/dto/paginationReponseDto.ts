import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional } from "class-validator";
import { UserEntity } from "src/app/modules/user/entities/user.entity";

export class PaginationResponseDto<UserEntity>{
    @IsArray()
    data: UserEntity[];

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    total: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    totalPages: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    currentPage: number;
}