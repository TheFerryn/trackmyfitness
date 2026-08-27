import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: 'https://legendary-space-zebra-rwpwq497xr42xp99-5173.app.github.dev', // ÄNDERN,
        credentials: true,
    });

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
