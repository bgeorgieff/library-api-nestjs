import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Books } from './books.schema';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.Array, ref: 'Books', required: true }])
  bookId: Books[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
