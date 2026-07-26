import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExerciseService {
    constructor(private readonly prisma: PrismaService) {}

    async getExercises() {
        try {
            return {
                ok: true,
                exercises: await this.prisma.exercise.findMany(),
            };
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }

    async createExercise(userId: string, name: string) {
        try {
            const exercise = await this.prisma.exercise.create({
                data: {
                    name,
                    createdBy: userId,
                },
            });
            return {
                ok: true,
                exercise,
            };
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }

    async deleteExercise(id: string) {
        try {
            await this.prisma.exercise.delete({
                where: {
                    id,
                },
            });
            return { ok: true };
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    throw new NotFoundException('Exercise not found');
                }
            }
            throw new InternalServerErrorException('Database error');
        }
    }
}
