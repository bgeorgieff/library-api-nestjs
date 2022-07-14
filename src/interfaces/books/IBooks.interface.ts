import { Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  isAvailable: boolean;
  cover: string;
  count: number;
  description: string;
  author: string[];
  genres: string[];
}
