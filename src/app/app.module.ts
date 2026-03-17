import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../config/database.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../app/modules/auth/config/jwt.config';
import { AuthModule } from '../app/modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig]
    }),
    DatabaseModule, 
    UserModule,
    AuthModule,
    ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
