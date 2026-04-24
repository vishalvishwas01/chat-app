import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from './dto/message-response.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @ApiOperation({ summary: 'Get messages by room' })
  @ApiQuery({
    name: 'room',
    required: true,
    description: 'Room ID',
    example: 'room1',
  })
  @ApiResponse({
    status: 200,
    description: 'List of messages for the room',
    type: [MessageResponseDto],
  })
  async getMessages(@Query('room') room: string) {
    return this.chatService.getMessagesByRoom(room);
  }
}
