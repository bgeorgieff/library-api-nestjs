import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMessage } from 'src/interfaces/messages/IMessage.interface';

export type MessageDocument = Message & Document;

@Schema()
export class Message implements IMessage {
  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ required: true })
  recipientId: string;

  _id;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
