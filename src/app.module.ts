import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppConfigModule } from './config/app/app.config.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { ContactController } from './contact/contact.controller';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    UserModule,
    ContactModule
  ],
  controllers: [AppController, ContactController],
  providers: [UserService],
})
export class AppModule {}
