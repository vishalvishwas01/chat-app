import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  // Save a new message
  async createMessage(sender: string, content: string, room: string) {
    const newMessage = new this.messageModel({
      sender,
      content,
      room,
    });

    return newMessage.save();
  }

  // Get messages by room
  async getMessagesByRoom(room: string) {
    return this.messageModel.find({ room }).sort({ createdAt: 1 }).exec();
  }
}
