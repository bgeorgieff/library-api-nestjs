import { Document } from 'mongoose';

export class IMessage extends Document {
  content: string;
  read: boolean;
  recipientId: string;
  _id?: string;
}
