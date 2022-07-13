import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { MessagesService } from '../messages/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/messages.schema';
import {
  AdminMessage,
  AdminMessageSchema,
} from 'src/schemas/messages-admin.schema';
import { Rents, RentsSchema } from 'src/schemas/rents.schema';
import { BooksService } from '../books/books.service';
import { Books, BooksSchema } from 'src/schemas/books.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rents.name,
        schema: RentsSchema,
      },
    ]),
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
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
  ],
  providers: [RentsService, MessagesService, BooksService, CloudinaryService],
  controllers: [RentsController],
})
export class RentsModule {}
