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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server | undefined;

  constructor(private readonly chatService: ChatService) {}

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
    void client.join(room);

    // store user
    if (!this.onlineUsers[room]) {
      this.onlineUsers[room] = [];
    }

    this.onlineUsers[room].push({
      socketId: client.id,
      username,
    });

    // send chat history
    const messages = await this.chatService.getMessagesByRoom(room);
    client.emit('chat_history', messages);

    // broadcast updated users list
    this.server!.to(room).emit(
      'online_users',
      this.onlineUsers[room].map((u) => u.username),
    );
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(@MessageBody() payload: CreateMessageDto) {
    console.log(`Message received:`, payload);
    const message = await this.chatService.createMessage(
      payload.sender,
      payload.content,
      payload.room,
    );

    this.server!.to(payload.room).emit('receive_message', message);
  }

  // handle disconnect
  handleDisconnect(client: Socket) {
    for (const room in this.onlineUsers) {
      const users = this.onlineUsers[room];

      const updatedUsers = users.filter((u) => u.socketId !== client.id);

      if (updatedUsers.length !== users.length) {
        this.onlineUsers[room] = updatedUsers;

        // broadcast updated list
        this.server!.to(room).emit(
          'online_users',
          updatedUsers.map((u) => u.username),
        );
      }
    }
  }
}
