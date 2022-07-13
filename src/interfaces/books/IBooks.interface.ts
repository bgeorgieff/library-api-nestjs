import { Document } from 'mongoose';
import { IAuthor } from '../authors/IAuthor.interface';
import { IGenre } from '../genres/IGenre.interface';

export interface IBook extends Document {
  title: string;
  isAvailable: boolean;
  cover: string;
  count: number;
  description;
}
