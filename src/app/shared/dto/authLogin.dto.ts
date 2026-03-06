import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthLogin {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
        description: 'Token do usuario',
  })
    @IsString()
    token: string;

    @ApiProperty({
        example: '/gerenciamento',
        description: 'Caminho autorizado para o usuario',
      })
    @IsString()
    redirectRoute: string

}