import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BodyweightService {
    constructor(private readonly prisma: PrismaService) {}

    async createEntry(userId: string, value: number, day: string) {
        if (day > new Date().toISOString().slice(0, 10)) {
            throw new BadRequestException('You cannot set bodyweight for the future');
        }
        try {
            await this.prisma.bodyweight.upsert({
                where: {
                    userId_day: { userId, day },
                },
                update: {
                    value,
                },
                create: {
                    userId,
                    day,
                    value,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
        return { ok: true };
    }
    async getEntries(userId: string, day?: string) {
        try {
            let data;
            if (day) {
                data = await this.prisma.bodyweight.findUnique({
                    where: {
                        userId_day: { userId, day },
                    },
                });
            } else {
                data = await this.prisma.bodyweight.findMany({
                    where: { userId },
                    orderBy: {
                        day: 'desc',
                    },
                });
            }
            return { ok: true, data };
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }
}
