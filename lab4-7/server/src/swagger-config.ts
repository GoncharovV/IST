import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Лабораторные работы 4-7 ИСТ')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .setLicense('VADIM GONCHAROV', '')
    .build()


export const configureSwagger = (app: INestApplication) => {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, document)
}
