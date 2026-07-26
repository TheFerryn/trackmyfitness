import {
    Body,
    Controller,
    UseGuards,
    Post,
    Res,
    Get,
    Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './providers/auth.service';
import { AuthGuard } from './auth.guard';
import { RequestCodeDto } from './dto/request-code.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle({ default: { limit: 100, ttl: 60000 } })
    @Post('request-code')
    generateCode(@Body() dto: RequestCodeDto) {
        return this.authService.generateCode(dto.email);
    }

    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const data = await this.authService.login(dto.email, dto.code);
        res.cookie('session', data.session.token, {
            httpOnly: true,
            secure: process.env.PROD === 'true',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return {
            ok: true,
            user: data.user,
        };
    }

    @UseGuards(AuthGuard)
    @Get('logout')
    logout(@Res({ passthrough: true }) res: Response, @Req() req) {
        res.clearCookie('session', {
            httpOnly: true,
            secure: process.env.prod === 'true',
            sameSite: 'lax',
        });
        return this.authService.logout(req.user.id);
    }
}
