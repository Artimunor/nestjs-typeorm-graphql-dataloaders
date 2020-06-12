import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const NEST_PORT = process.env.NEST_PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(NEST_PORT);
  Logger.log(`🚀 Server is up and running on http://localhost:${NEST_PORT}/graphql`, 'Bootstrap');
}
bootstrap();
