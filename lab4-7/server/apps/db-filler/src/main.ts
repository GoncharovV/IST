import { NestFactory } from '@nestjs/core';
import { DbFillerModule } from './db-filler.module';

async function bootstrap() {
  const app = await NestFactory.create(DbFillerModule);
  await app.listen(5000);
}
bootstrap();
