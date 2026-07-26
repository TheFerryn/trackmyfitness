import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class HeightDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Max(230)
    height: number;
}
