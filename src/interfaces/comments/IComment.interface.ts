import { Document } from 'mongoose';
import { IBook } from '../books/IBooks.interface';

export interface IComment extends Document {
  rating: number;
  content: string;
  bookId: IBook;
  userId: string;
}
