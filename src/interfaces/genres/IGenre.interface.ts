import { Document } from 'mongoose';
import { IBook } from '../books/IBooks.interface';

export interface IGenre extends Document {
  name: string;
  bookId: IBook[];
}
