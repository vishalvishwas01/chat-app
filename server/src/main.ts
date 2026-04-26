import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExportService } from './queue/export.service';
import './queue/export.worker';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Chat App API')
    .setDescription('API documentation for real-time chat app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/exports', express.static('/app/exports'));

  await app.listen(3000);

  console.log(`Server running on http://localhost:3000`);
  console.log('DEMO_Var: ', process.env.DEMO_VAR);
  const exportService = app.get(ExportService);
  await exportService.addExportJob('vishal');
}
void bootstrap();
