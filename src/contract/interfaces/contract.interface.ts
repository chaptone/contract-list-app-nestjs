export interface Contract {
    id: number;
    firstName: string;
    lastName?: string;
    birthDate?: Date;
    phones?: string[];
    emails?: string[];
    urls?: string[];
}