import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HeightDto } from './dto/height.dto';
import { SettingsService } from './settings.service';

@UseGuards(AuthGuard)
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Patch('height')
    setHeight(@Body() dto: HeightDto, @Req() req) {
        return this.settingsService.setHeight(req.user.id, dto.height);
    }
}
