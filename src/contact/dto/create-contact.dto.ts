import { IsEmail, IsString, IsOptional, IsNotEmpty, IsDateString, IsNumber, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactDto {

    @Transform(id => parseInt(id))
    @IsNumber()
    @IsNotEmpty()
    groupId: number

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsDateString()
    @IsOptional()
    birthDate: Date

    @IsString({each: true})
    @IsOptional()
    phones: string[]

    @IsEmail({}, {each: true})
    @IsOptional()
    emails: string[]

    @IsString({each: true})
    @IsOptional()
    urls: string[]
}