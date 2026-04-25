import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { AuditService } from '../../common/logger/audit.service';
import { PrismaModule } from '../../prisma/prisma.module';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Module({
  imports: [
    PrismaModule,
    // Register Message schema with MongoDB
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatGateway, ChatService, AuditService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
