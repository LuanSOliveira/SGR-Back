import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não definidas no DTO vindo de um endpoint
    forbidNonWhitelisted: true, // Retorna erro se houver propriedades não definidas no DTO vindo de um endpoint
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
