import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './config/app/app.config.service';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService : AppConfigService = app.get('AppConfigService');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  // app.use(csurf());

  const options = new DocumentBuilder()
    .setTitle('Contract List App')
    .setDescription('Contract List App API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfigService.port);
  console.log('Server running at port: ' + appConfigService.port)
}
bootstrap();
