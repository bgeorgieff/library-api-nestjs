import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IGenre } from 'src/interfaces/genres/IGenre.interface';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre extends Document implements IGenre {
  @Prop({ required: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
