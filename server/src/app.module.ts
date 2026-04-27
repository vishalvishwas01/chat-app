import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './modules/chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './modules/upload/upload.module';
import { ExportModule } from './modules/export/export.module';

@Module({
  imports: [
    ExportModule,
    UploadModule,
    PrismaModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat-app',
    ),

    ChatModule,
  ],
})
export class AppModule {}
