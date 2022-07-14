import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Books } from './books.schema';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  bio: string;

  @Prop([{ type: mongoose.Types.Array, ref: 'Books', required: true }])
  bookId: Books[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
