import { Document } from 'mongoose';
import { IBook } from '../books/IBooks.interface';

export interface IAuthor extends Document {
  name: string;
  bio: string;
  bookId: IBook[];
}
