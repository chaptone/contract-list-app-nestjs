import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { GroupService } from './group.service';

@Module({
    providers: [ContactService, GroupService],
    controllers: [ContactController],
    exports: [ContactService, GroupService],
})
export class ContactModule {}
