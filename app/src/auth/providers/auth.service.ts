import {
    Injectable,
    Inject,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { MailService } from './mail.service';
import { UserService } from './user.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailService: MailService,
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async generateCode(email: string) {
        const code = crypto.randomInt(100000, 1000000).toString();
        const hash = await bcrypt.hash(code, 10);

        await this.cacheManager.set(email, hash, 5 * 60 * 1000);
        //if (process.env.PROD === 'true')
        await this.mailService.sendCode(email, code);

        return {
            ok: true,
        };
    }

    async login(email: string, code: string) {
        const hash = await this.cacheManager.get(email);

        if (hash === undefined) {
            throw new BadRequestException('No code found');
        }

        const validation = await bcrypt.compare(code, hash);
        if (validation) {
            let user = await this.userService.findUser(email);
            if (!user) user = await this.userService.createUser(email);

            const session = await this.sessionService.createSession(user.id);

            return {
                ok: true,
                user,
                session,
            };
        } else throw new ForbiddenException('Invalid code');
    }

    async logout(userId: string) {
        await this.sessionService.deleteSession(userId);
        return {
            ok: true,
        };
    }
}
