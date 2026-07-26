import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BodyweightService } from './bodyweight.service';
import { BodyweightController } from './bodyweight.controller';

@Module({
    controllers: [BodyweightController],
    providers: [PrismaService, BodyweightService],
})
export class BodyweightModule {}
