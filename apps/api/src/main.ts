import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
        credentials: true,
    });

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
