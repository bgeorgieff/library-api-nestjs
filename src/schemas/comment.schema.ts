import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comments } from 'src/enums/comments.enum';
import { IComment } from 'src/interfaces/comments/IComment.interface';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment implements IComment {
  @Prop({ required: true, min: Comments.RatingMin, max: Comments.RatingMax })
  rating: number;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
