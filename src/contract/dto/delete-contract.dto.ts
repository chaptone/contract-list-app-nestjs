
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class DeleteContractDto {
    @IsNumberString()
    @IsNotEmpty()
    contractId: number
}