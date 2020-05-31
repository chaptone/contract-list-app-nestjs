import { Contact } from '../interfaces/contact.interface';

export const ContactData: Contact[] = [
    {
        id: 1,
        firstName: 'Clark',
        lastName: 'Kent',
        birthDate: new Date('1980-01-15'),
        phones: ['123-4851-895'],
        emails: ['superman@dc.io'],
        urls: ['superman.dc.io', 'superman.com'],
    }
]