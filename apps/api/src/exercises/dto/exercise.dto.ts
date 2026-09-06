import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ExerciseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    name: string;
}
