import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SettingsService {
    constructor(private readonly prisma: PrismaService) {}

    async setHeight(id: string, height: number) {
        try {
            await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    height,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException('Database error');
        }
        return { ok: true };
    }
}
