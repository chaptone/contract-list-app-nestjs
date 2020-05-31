export interface Contact {
    id: number
    groupId: number
    firstName: string
    lastName?: string
    birthDate?: Date
    phones?: string[]
    emails?: string[]
    urls?: string[]
}