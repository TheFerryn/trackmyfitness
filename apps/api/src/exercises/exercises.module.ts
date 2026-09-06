import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExerciseService } from './exercises.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [ExercisesController],
    providers: [PrismaService, ExerciseService],
})
export class ExercisesModule {}
