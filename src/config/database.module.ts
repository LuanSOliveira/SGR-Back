import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'restaurante_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // CUIDADO: Use true apenas em desenvolvimento
      autoLoadEntities: true, // Carrega automaticamente as entidades
    }),
  ],
})
export class DatabaseModule {}
