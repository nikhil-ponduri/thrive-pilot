// Load environment variables from .env file
import * as dotenv from 'dotenv';
dotenv.config();

// NEVER hardcode API keys in source code
// Use a .env file for development and environment variables for production

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 7000);
}

bootstrap();
