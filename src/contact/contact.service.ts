import { Injectable, HttpException } from '@nestjs/common';
import { Contact } from './interfaces/contact.interface';
import { ContactData } from './data/contact.data';
import { Group } from './interfaces/group.interface';
import { GroupData } from './data/group.data';

@Injectable()
export class ContactService {
    private contacts: Contact[] = [];
    private groups: Group[] = [];

    constructor() {
        this.contacts = ContactData
        this.groups = GroupData
    }

    async create(contact: any): Promise<Contact[]> {
        const { groupId } = contact
        const group = this.groups.find(g => g.id === groupId)
        if (!group) {
            throw new HttpException('Group of this contact does not exist!', 404);
        }
        const contactWithId = { id: this.contacts.length + 1, ...contact }
        this.contacts.push(contactWithId)
        // update total contact after create new contact
        group.totalContact = group.totalContact + 1
        return this.contacts;
    }

    async findOne(id: number): Promise<Contact | undefined> {
        const contact = this.contacts.find(u => u.id === id);
        if (!contact) {
            throw new HttpException('Contact does not exist!', 404);
        }
        return contact
    }

    async find(groupId: number): Promise<Contact[] | []> {
        return this.contacts.filter(c => c.groupId === groupId);
    }

    async delete(id: number): Promise<Contact[]> {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index === -1) {
            throw new HttpException('Contact does not exist!', 404);
        }
        this.contacts = this.contacts.filter(c => c.id !== id);
        return this.contacts;
    }

    async deleteByGroupId(groupId: number): Promise<Contact[]> {
        this.contacts = this.contacts.filter(c => c.groupId !== groupId);
        return this.contacts;
    }
}