import { Document } from 'mongoose';
import { IUser } from './IUser.interface';

export interface IUserToken extends Document {
  user: IUser;
  token: string;
}
