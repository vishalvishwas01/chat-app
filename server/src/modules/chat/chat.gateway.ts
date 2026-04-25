/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuditService } from '../../common/logger/audit.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly auditService: AuditService,
  ) {}

  // store users per room
  private onlineUsers: Record<
    string,
    { socketId: string; username: string }[]
  > = {};

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() data: { room: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, username } = data;

    try {
      client.join(room);

      // store user
      if (!this.onlineUsers[room]) {
        this.onlineUsers[room] = [];
      }

      this.onlineUsers[room].push({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        socketId: client.id,
        username,
      });

      // audit log
      await this.auditService.logAction('USER_JOINED', username);

      // send chat history
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const messages = await this.chatService.getMessagesByRoom(room);
      client.emit('chat_history', messages);

      // broadcast users
      this.server.to(room).emit(
        'online_users',
        this.onlineUsers[room].map((u) => u.username),
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      await this.auditService.logError(
        'USER_JOIN_FAILED',
        username || 'unknown',
        errorMessage,
        'handleJoinRoom',
      );
    }
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(@MessageBody() payload: CreateMessageDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const message = await this.chatService.createMessage(
        payload.sender,
        payload.content,
        payload.room,
      );

      // audit log
      await this.auditService.logAction('MESSAGE_SENT', payload.sender);

      this.server.to(payload.room).emit('receive_message', message);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      await this.auditService.logError(
        'MESSAGE_FAILED',
        payload.sender || 'unknown',
        errorMessage,
        'handleSendMessage',
      );
    }
  }

  handleDisconnect(client: Socket) {
    for (const room in this.onlineUsers) {
      const users = this.onlineUsers[room];

      const updatedUsers = users.filter((u) => u.socketId !== client.id);

      if (updatedUsers.length !== users.length) {
        this.onlineUsers[room] = updatedUsers;

        this.server.to(room).emit(
          'online_users',
          updatedUsers.map((u) => u.username),
        );
      }
    }
  }
}
