import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(email: string) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    createdAt: new Date(Date.now()),
                },
            });
            return user;
        } catch (err) {
            if (err.code === 'P2002') {
                throw new BadRequestException(
                    'User with this email already exists',
                );
            } else {
                throw new InternalServerErrorException('Database error');
            }
        }
    }

    async findUser(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
}
