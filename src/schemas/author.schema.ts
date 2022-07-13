import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAuthor } from 'src/interfaces/authors/IAuthor.interface';

export type AuthorDocument = Author & Document;

@Schema()
export class Author extends Document implements IAuthor {
  @Prop({ required: true })
  name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
