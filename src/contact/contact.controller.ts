import { Controller, Get, UseGuards, Body, Post, Param, Query, Delete } from "@nestjs/common";
import { ContactService } from './contact.service';
import { Contact } from './interfaces/contact.interface';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateContactDto } from "./dto/create-contact.dto";
import { DeleteContactDto } from './dto/delete-contact.dto';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getContacts(): Promise<Contact[]> {
        return this.contactService.find()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':contactID')
    async getContact(@Param('contactID') contactId: number): Promise<Contact> {
        return this.contactService.findOne(contactId)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createContact(@Body() createContactDto: CreateContactDto): Promise<Contact[]> {
        return this.contactService.create(createContactDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteBook(@Query() deleteContactDto: DeleteContactDto) {
        console.log("ContactController -> deleteBook -> DeleteContactDto", deleteContactDto)
        return this.contactService.deleteBook(deleteContactDto.contactId);
    }
}