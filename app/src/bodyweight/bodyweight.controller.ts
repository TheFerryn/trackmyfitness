import {
    Controller,
    UseGuards,
    Get,
    Patch,
    Req,
    Query,
    Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BodyweightService } from './bodyweight.service';
import { GetBodyweightEntriesQueryDto } from './dto/get-bodyweight-entries.query.dto';
import { CreateBodyweightEntryDto } from './dto/create-bodyweight-entry.dto';

@UseGuards(AuthGuard)
@Controller('bodyweight')
export class BodyweightController {
    constructor(private readonly bodyweightService: BodyweightService) {}

    @Get('entries')
    getEntries(@Req() req, @Query() query: GetBodyweightEntriesQueryDto) {
        return this.bodyweightService.getEntries(req.user.id, query.day);
    }

    @Patch('create-entry')
    createEntry(@Req() req, @Body() dto: CreateBodyweightEntryDto) {
        return this.bodyweightService.createEntry(
            req.user.id,
            dto.value,
            dto.day,
        );
    }
}
