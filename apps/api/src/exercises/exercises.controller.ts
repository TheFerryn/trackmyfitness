import {
    Controller,
    UseGuards,
    Get,
    Post,
    Delete,
    Body,
    Req,
    Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ExerciseService } from './exercises.service';
import { ExerciseDto } from './dto/exercise.dto';

@UseGuards(AuthGuard)
@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Get()
    getExercises() {
        return this.exerciseService.getExercises();
    }

    @Post('create')
    createExercise(@Body() dto: ExerciseDto, @Req() req) {
        return this.exerciseService.createExercise(req.user.id, dto.name);
    }

    @Delete('delete/:id')
    deleteExercise(@Param('id') id: string) {
        return this.exerciseService.deleteExercise(id);
    }
}
