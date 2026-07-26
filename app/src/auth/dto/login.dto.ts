import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    code: string;
}
