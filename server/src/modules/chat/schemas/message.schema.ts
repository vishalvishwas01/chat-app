import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: String, required: true })
  sender!: string;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: String, required: true })
  room!: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
