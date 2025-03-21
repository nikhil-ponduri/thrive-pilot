// Use environment variables from .env file or system environment
// NEVER hardcode API keys in source code
// Uncommenting this only if needed for development, but preferably use a .env file
// process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
// process.env.API_DOMAIN = process.env.API_DOMAIN || 'http://app.thrivesparrow.test';
// process.env.API_TOKEN = process.env.API_TOKEN || '';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
