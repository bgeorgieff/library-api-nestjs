import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './messages.schema';
export type AdminMessageDocument = AdminMessage & Document;

@Schema()
export class AdminMessage extends Message {}

export const AdminMessageSchema = SchemaFactory.createForClass(AdminMessage);
