import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { MailService } from './providers/mail.service';
import { UserService } from './providers/user.service';
import { SessionService } from './providers/session.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [CacheModule.register()],
    controllers: [AuthController],
    providers: [
        AuthService,
        MailService,
        UserService,
        SessionService,
        PrismaService,
    ],
})
export class AuthModule {}
