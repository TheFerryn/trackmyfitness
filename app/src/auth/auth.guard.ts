import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.cookies?.session;

        if (!token) throw new UnauthorizedException();
        const activeSessions = await this.prisma.session.findMany();
        let session = null;

        for (const s of activeSessions) {
            if (await bcrypt.compare(token, s.tokenHash)) {
                session = s;
                break;
            }
        }
        if (!session) throw new ForbiddenException();

        req.user = { id: session.userId };
        return true;
    }
}
