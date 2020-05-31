import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get<string>('jwt.secret'),
            signOptions: { expiresIn: '1800s' }
        };
    }

    get secret(): string {
      return this.configService.get<string>('jwt.secret');
    }
}