import { IsNumber, IsNotEmpty, Min, Max, Matches } from 'class-validator';

export class CreateBodyweightEntryDto {
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    day: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(40)
    @Max(140)
    value: number;
}
