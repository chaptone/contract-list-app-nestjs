import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateGroupDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(id => parseInt(id))
    @IsNumber()
    @IsOptional()
    order: number;

}