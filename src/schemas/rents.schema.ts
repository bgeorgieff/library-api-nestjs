import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Books } from './books.schema';

export type RentsDocument = Rents & Document;

@Schema()
export class Rents {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true })
  bookId: Books;

  @Prop({ required: true })
  bookTitle: string;

  @Prop({ required: true })
  bookCover: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({ required: true })
  userEmail: string;

  @Prop()
  dateRented: Date;

  @Prop()
  dateForReturn: Date;

  @Prop({ required: true, default: false })
  isApproved: boolean;

  @Prop({ required: true, default: false })
  isReturned: boolean;
}

export const RentsSchema = SchemaFactory.createForClass(Rents);
