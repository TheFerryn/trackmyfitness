import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class SessionService {
    constructor(private readonly prisma: PrismaService) {}

    async createSession(userId: string) {
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(token, 10);

        try {
            const activeSessions = await this.prisma.session.findMany({
                where: {
                    userId,
                },
            });
            if (activeSessions.length > 0) {
                await this.prisma.session.deleteMany({
                    where: {
                        userId,
                    },
                });
            }
            await this.prisma.session.create({
                data: {
                    userId,
                    tokenHash,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            });
            return { token };
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }

    async deleteSession(userId: string) {
        try {
            await this.prisma.session.deleteMany({
                where: {
                    userId,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
    }
}
