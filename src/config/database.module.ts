import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'seu_usuario',
      password: 'sua_senha',
      database: 'seu_banco',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // CUIDADO: Use true apenas em desenvolvimento
    }),
  ],
})
export class DatabaseModule {}
