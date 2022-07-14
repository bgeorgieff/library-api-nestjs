import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rents } from 'src/schemas/rents.schema';
import { MessagesService } from '../messages/messages.service';
import { IRentView } from '../../interfaces/rents/IRentsView.interface';
import { BooksService } from '../books/books.service';

@Injectable()
export class RentsService {
  constructor(
    @InjectModel(Rents.name)
    private readonly rent: Model<IRentView>,
    private readonly messagesService: MessagesService,
    private readonly booksService: BooksService,
  ) {}

  setMessage(id: string, content: string, read?: boolean): any {
    return {
      recipientId: id,
      read: read ? read : false,
      content,
    };
  }

  async requestBook(
    id: string,
    userId: string,
    userEmail: string,
  ): Promise<{ message: string } | undefined> {
    try {
      const book = await this.booksService.getBook(id);
      if (book.isAvailable) {
        const rentModel = {
          bookId: book._id,
          bookTitle: book.title,
          bookCover: book.cover,
          user: userId,
          userEmail,
          isApproved: false,
          isReturned: false,
        };

        await new this.rent(rentModel).save();

        const messageContent = `Please approve my rent request for ${book.title}`;
        const messageToAdmin = this.setMessage(userId, messageContent);

        await this.messagesService.toAdmin(messageToAdmin);

        return { message: 'Message to Admin has been sent' };
      } else {
        throw new BadRequestException('This book is unavailable');
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async approveBook(
    id: string,
    userId: string,
  ): Promise<{ message: string } | undefined> {
    try {
      const book = await this.booksService.getBook(id);
      const today = new Date();
      const afterOneWeek = today.setDate(today.getDate() + 7);
      await this.rent.findOneAndUpdate(
        { bookId: id },
        {
          $set: {
            isApproved: true,
            dateRented: new Date(),
            dateForReturn: afterOneWeek,
          },
        },
      );

      const userMessage = `Rent request for ${book.title} is approved`;
      const messageToUser = this.setMessage(userId, userMessage);

      await this.messagesService.toUser(messageToUser);

      return { message: 'Book rent approved' };
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllApproved(userId: string): Promise<IRentView[] | undefined> {
    try {
      return await this.rent.find({
        _id: userId,
        isApproved: true,
        isReturned: false,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getReturnedBooks(userId: string): Promise<IRentView[] | undefined> {
    return await this.rent.find({ _id: userId, isReturned: true });
  }

  async markAsReturned(id: string): Promise<{ message: string } | undefined> {
    try {
      const returnedBook = await this.rent.findOneAndUpdate(
        { bookId: id },
        { isReturned: true },
        { returnDocument: 'after' },
      );

      const userMessage = `Your book ${returnedBook.bookTitle} is returned`;
      const messageToUser = this.setMessage(returnedBook.user, userMessage);

      await this.messagesService.toUser(messageToUser);

      return { message: 'Book returned' };
    } catch (e) {
      throw new Error(e);
    }
  }
}
