export interface Contact {
    id: number;
    firstName: string;
    lastName?: string;
    birthDate?: Date;
    phones?: string[];
    emails?: string[];
    urls?: string[];
}