import { Injectable, HttpException } from '@nestjs/common';
import { Group } from './interfaces/group.interface';
import { GroupData } from './data/group.data';
import { ContactData } from './data/contact.data';
import { Contact } from './interfaces/contact.interface';
import { ContactService } from './contact.service';

@Injectable()
export class GroupService {
    private groups: Group[] = [];
    private contacts: Contact[] = ContactData;
    private contactService: ContactService;

    constructor(contactService: ContactService) {
        this.groups = GroupData
        this.contactService = contactService
        // this.contacts = ContactData
    }

    async create(group: any): Promise<Group[]> {
        const groupWithId = { id: this.groups.length + 1, totalContact: 0, ...group }
        this.groups.push(groupWithId)
        return this.groups;
    }

    async findOne(id: number): Promise<Group> {
        const group = this.groups.find(g => g.id === id);
        if (!group) {
            throw new HttpException('Group does not exist!', 404);
        }
        return group
    }

    async find(): Promise<Group[]> {
        return this.groups;
    }

    async update(id: number, updateGroup: any): Promise<Group> {

        let group = this.groups.find(g => g.id === id);
        if (!group) {
            throw new HttpException('Group does not exist!', 404);
        }
        group = { ...group, ...updateGroup }
        return group
    }

    async delete(id: number): Promise<Group[]> {
        const index = this.groups.findIndex(g => g.id === Number(id));
        if (index === -1) {
            throw new HttpException('Group does not exist!', 404);
        }
        this.groups = this.groups.filter(g => g.id !== id)
        // also cascade delete contact by groupId
        this.contactService.deleteByGroupId(id)
        return this.groups;
    }
}