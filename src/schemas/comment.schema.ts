import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comments } from 'src/enums/comments.enum';
import { Books } from './books.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true, min: Comments.RatingMin, max: Comments.RatingMax })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true })
  bookId: Books;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
