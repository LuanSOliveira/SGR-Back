import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthLogin } from '../../shared/dto/authLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do Usuário' })
  @ApiResponse({
      status: 201,
      description: 'Login realizado com sucesso',
      type: AuthLogin,
    })
  @ApiResponse({
    status: 404,
    description: 'Usuario não existe',
  })
  @ApiResponse({
    status: 401,
    description: 'Senha incorreta',
  })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

}
