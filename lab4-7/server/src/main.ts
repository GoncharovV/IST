import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './swagger-config';


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    configureSwagger(app);
	
	app.enableCors();

    await app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
}

start()
