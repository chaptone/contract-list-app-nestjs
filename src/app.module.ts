import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppConfigModule } from './config/app/app.config.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ContractModule } from './contract/contract.module';
import { ContractController } from './contract/contract.controller';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    UserModule,
    ContractModule
  ],
  controllers: [AppController, ContractController],
  providers: [UserService],
})
export class AppModule {}
