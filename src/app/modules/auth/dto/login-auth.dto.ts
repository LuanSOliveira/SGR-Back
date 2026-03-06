import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { AuthLogin } from "src/app/shared/dto/authLogin.dto";

export class LoginAuthDto{
    @ApiProperty({
         example: 'EdBombadao123',
         description: 'Login ja cadastrado do usuario',
         minLength: 5,
         maxLength: 255,
      })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({
        example: '123456789',
        description: 'Senha do cadastro do usuario',
        minLength: 5,
        maxLength: 128,
      })
    @IsString()
    @IsNotEmpty()
    password: string;
}
