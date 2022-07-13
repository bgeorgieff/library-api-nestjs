import { Document } from 'mongoose';
import { IMessage } from '../messages/IMessage.interface';

export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly password: string;
  readonly country: string;
  readonly city: string;
  readonly street: string;
  readonly streetNumber: string;
  readonly additionalInfo: string;
  readonly isAdmin: boolean;
  readonly imgUrl: string;
  readonly messagesReceived: IMessage[];
}
