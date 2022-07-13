import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  streetNumber: string;

  @Prop()
  buildingNumber: string;

  @Prop()
  apartmentNumber: string;

  @Prop()
  additionalInfo: string;

  @Prop({ required: false, default: false })
  isAdmin: boolean;

  @Prop()
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
