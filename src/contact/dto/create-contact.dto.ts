import { IsEmail, IsString, IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsDateString()
    @IsOptional()
    birthDate: Date;

    @IsString({each: true})
    @IsOptional()
    phones: string[];

    @IsEmail({}, {each: true})
    @IsOptional()
    emails: string[];

    @IsString({each: true})
    @IsOptional()
    urls: string[];
}