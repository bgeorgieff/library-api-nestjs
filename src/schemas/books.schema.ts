import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BooksDocument = Books & Document;

@Schema({ timestamps: true })
export class Books {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isAvailable: boolean;

  @Prop()
  cover: string;

  @Prop({ type: Number, required: true, default: 0 })
  count: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string[];

  @Prop({ required: true })
  genres: string[];
}

export const BooksSchema = SchemaFactory.createForClass(Books);
