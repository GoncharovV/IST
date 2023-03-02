import { NestFactory } from '@nestjs/core';
import { PresenterModule } from './presenter.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      PresenterModule,
      {
        transport: Transport.TCP,
      }
  )
  await app.listen();
}
bootstrap();
