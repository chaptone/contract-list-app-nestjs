import { Controller, Get, UseGuards, Body, Post, Param, Query, Delete } from "@nestjs/common";
import { ContractService } from './contract.service';
import { Contract } from './interfaces/contract.interface';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateContractDto } from "./dto/create-contract.dto";
import { DeleteContractDto } from './dto/delete-contract.dto';

@Controller('contracts')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getContracts(): Promise<Contract[]> {
        return this.contractService.find()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':contractID')
    async getContract(@Param('contractID') contractId: number): Promise<Contract> {
        return this.contractService.findOne(contractId)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createContract(@Body() createContractDto: CreateContractDto): Promise<Contract[]> {
        return this.contractService.create(createContractDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteBook(@Query() deleteContractDto: DeleteContractDto) {
        console.log("ContractController -> deleteBook -> DeleteContractDto", deleteContractDto)
        return this.contractService.deleteBook(deleteContractDto.contractId);
    }
}