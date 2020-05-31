import { Controller, Get, UseGuards, Body, Post, Param, Query, Delete, ParseIntPipe } from "@nestjs/common";
import { ContactService } from './contact.service';
import { Contact } from './interfaces/contact.interface';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateContactDto } from "./dto/create-contact.dto";
import { Group } from "./interfaces/group.interface";
import { CreateGroupDto } from "./dto/create-group.dto";
import { GroupService } from "./group.service";

@Controller('contactList')
export class ContactController {
    constructor(
        private contactService: ContactService,
        private groupService: GroupService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('contacts')
    async getContacts(@Query('groupId', ParseIntPipe) groupId: number): Promise<Contact[]> {
        return this.contactService.find(groupId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('contacts/:contactId')
    async getContact(@Param('contactId') contactId: number): Promise<Contact> {
        return this.contactService.findOne(contactId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('contacts')
    async createContact(@Body() createContactDto: CreateContactDto): Promise<Contact[]> {
        return this.contactService.create(createContactDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('contacts')
    async deleteContact(@Query('contactId', ParseIntPipe) contactId: number) {
        return this.contactService.delete(contactId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('groups')
    async getGroups(): Promise<Group[]> {
        return this.groupService.find()
    }

    @UseGuards(JwtAuthGuard)
    @Get('groups/:groupId')
    async getGroup(@Param('groupId') contactId: number): Promise<Group> {
        return this.groupService.findOne(contactId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('groups')
    async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group[]> {
        return this.groupService.create(createGroupDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('groups')
    async deleteGroup(@Query('groupId', ParseIntPipe) groupId: number) {
        return this.groupService.delete(groupId)
    }
}