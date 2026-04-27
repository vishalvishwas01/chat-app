import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { AuditService } from '../../common/logger/audit.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ExportService } from '../../queue/export.service';
import { ExportController } from '../../queue/export.controller';

@Module({
  imports: [
    PrismaModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatGateway, ChatService, AuditService, ExportService],
  controllers: [ChatController, ExportController],
  exports: [ChatService, ExportService],
})
export class ChatModule {}
