import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [UploadController],
})
export class UploadModule {}
