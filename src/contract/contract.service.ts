import { Injectable, HttpException } from '@nestjs/common';
import { Contract } from './interfaces/contract.interface';
import { ContractData } from './data/contract.data';


@Injectable()
export class ContractService {
    private readonly contracts: Contract[] = [];
    // private readonly contract: Contract = undefined;

    constructor() {
        this.contracts = ContractData
    }

    async create(contract: any): Promise<Contract[]> {
        const contractWithId = { id: this.contracts.length + 1, ...contract }
        this.contracts.push(contractWithId)
        return this.contracts;
    }

    async findOne(id: number): Promise<Contract | undefined> {
        const contract = this.contracts.find(u => u.id === id);
        if (!contract) {
            throw new HttpException('Contract does not exist!', 404);
        }
        return contract
    }

    async find(): Promise<Contract[] | []> {
        return this.contracts;
    }

    async deleteBook(id: number): Promise<Contract[]> {
        const index = this.contracts.findIndex(c => c.id === Number(id));
        if (index === -1) {
            throw new HttpException('Contract does not exist!', 404);
        }
        this.contracts.splice(1, index);
        return this.contracts;
    }
}