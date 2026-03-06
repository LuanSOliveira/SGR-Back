import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { login: loginAuthDto.login }
    });

    if(!user){
      throw new NotFoundException('Usuario não existe');
    }

    console.log(user);

    const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.passwordHash);

    if(!isPasswordValid){
      throw new UnauthorizedException('Senha incorreta');
    }

    const redirectRoute = user.profile === 'Admin' ? '/gerenciamento' : '/outro_caminho'

    const acessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.login
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      }
    )

    return {
      token: acessToken,
      redirectRoute: redirectRoute
    }
  }

}
