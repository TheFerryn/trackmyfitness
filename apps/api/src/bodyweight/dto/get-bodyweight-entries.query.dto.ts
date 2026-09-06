import { Matches, IsOptional } from 'class-validator';

export class GetBodyweightEntriesQueryDto {
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    day?: string;
}
