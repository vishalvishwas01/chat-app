import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './modules/chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Module({
  imports: [
    PrismaModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat-app',
    ),

    ChatModule,
  ],
})
export class AppModule {}
