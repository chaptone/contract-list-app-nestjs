import { Injectable, HttpException } from '@nestjs/common';
import { Contact } from './interfaces/contact.interface';
import { ContactData } from './data/contact.data';


@Injectable()
export class ContactService {
    private readonly contacts: Contact[] = [];
    // private readonly contact: Contact = undefined;

    constructor() {
        this.contacts = ContactData
    }

    async create(contact: any): Promise<Contact[]> {
        const contactWithId = { id: this.contacts.length + 1, ...contact }
        this.contacts.push(contactWithId)
        return this.contacts;
    }

    async findOne(id: number): Promise<Contact | undefined> {
        const contact = this.contacts.find(u => u.id === id);
        if (!contact) {
            throw new HttpException('Contact does not exist!', 404);
        }
        return contact
    }

    async find(): Promise<Contact[] | []> {
        return this.contacts;
    }

    async deleteBook(id: number): Promise<Contact[]> {
        const index = this.contacts.findIndex(c => c.id === Number(id));
        if (index === -1) {
            throw new HttpException('Contact does not exist!', 404);
        }
        this.contacts.splice(1, index);
        return this.contacts;
    }
}