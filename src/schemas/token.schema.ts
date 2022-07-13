import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';

export type TokenDocument = Token & Document;

@Schema({ timestamps: true })
export class Token {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop()
  token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
