import { Injectable, HttpException } from '@nestjs/common';
import { Group } from './interfaces/group.interface';
import { GroupData } from './data/group.data';
import { ContactService } from './contact.service';

@Injectable()
export class GroupService {
    private groups: Group[] = [];
    private contactService: ContactService;

    constructor(contactService: ContactService) {
        this.groups = GroupData
        this.contactService = contactService
    }

    async create(group: any): Promise<Group[]> {
        const createGroup = {
            id: this.groups.length + 1,
            order: this.groups.length + 1,
            totalContact: 0,
            ...group
        }
        this.groups.push(createGroup)
        return this.groups;
    }

    async update(id: number, update: any): Promise<Group> {
        const index = this.groups.findIndex(c => c.id === id)
        if (index === -1) {
            throw new HttpException('Group does not exist!', 404);
        }
        const group = this.groups[index]
        const updateGroup = { ...group, ...update }
        // this.groups[index] = updateGroup
        const isNotOrder = update.order && update.order > this.groups.length
        if (isNotOrder) {
            throw new HttpException('Order must equal or less than ' + this.groups.length, 404);
        }
        const isOrderChange = update.order && group.order !== update.order
        if (isOrderChange) {
            // rearrange when order change
            const changedOrder = update.order
            this.rearrangeGroup(index, updateGroup, changedOrder)
        }
        return updateGroup
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

    async delete(id: number): Promise<Group[]> {
        const index = this.groups.findIndex(g => g.id === Number(id));
        if (index === -1) {
            throw new HttpException('Group does not exist!', 404);
        }
        this.groups = this.groups.filter(g => g.id !== id)
        // rearrangeGroup after delete
        this.groups = this.groups.map(g => g.order <= index ? g : { ...g, order: g.order - 1 })
        // also cascade delete contact by groupId
        this.contactService.deleteByGroupId(id)
        return this.groups;
    }

    private sortGroup(group: Group[]): Group[] {
        return group.sort((a, b) => a.order - b.order)
    }

    private sortingGroup(): void {
        this.groups.sort((a, b) => a.order - b.order)
    }

    private rearrangeGroup(index: number, updateGroup: Group, changedOrder: number): void {
        this.sortingGroup()
        const changedIndex = changedOrder - 1
        const groupAtTargetIndex = this.groups[changedIndex]
        groupAtTargetIndex.order = index + 1
        this.groups[changedIndex] = updateGroup
        this.groups[index] = groupAtTargetIndex
    }
}