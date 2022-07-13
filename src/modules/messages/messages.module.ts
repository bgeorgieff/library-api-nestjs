import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/messages.schema';
import {
  AdminMessage,
  AdminMessageSchema,
} from 'src/schemas/messages-admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
        collection: 'messages-user',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: AdminMessage.name,
        schema: AdminMessageSchema,
        collection: 'messages-admin',
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
