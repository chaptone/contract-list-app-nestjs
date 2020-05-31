
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class DeleteContactDto {
    @IsNumberString()
    @IsNotEmpty()
    contactId: number
}