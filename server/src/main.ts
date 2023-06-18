import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const PORT = +process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  app.use(cookieParser());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))

}
bootstrap();
