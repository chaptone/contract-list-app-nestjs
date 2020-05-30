import { Injectable } from '@nestjs/common';
import { Contract } from './interfaces/contract.interface';
import { ContractData } from './data/contract.data';


@Injectable()
export class ContractService {
    private readonly contracts: Contract[] = [];
    private readonly contract: Contract = undefined;

    constructor() {
        this.contracts = []
    }

    async findOne(id: number): Promise<Contract | undefined> {
        return this.contracts.find(u => u.id === id);
    }

    async find(): Promise<Contract[]> {
        return this.contracts;
    }
}