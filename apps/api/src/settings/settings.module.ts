import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { PrismaService } from 'src/prisma.service';
import { SettingsService } from './settings.service';

@Module({
    imports: [],
    controllers: [SettingsController],
    providers: [PrismaService, SettingsService],
})
export class SettingsModule {}
