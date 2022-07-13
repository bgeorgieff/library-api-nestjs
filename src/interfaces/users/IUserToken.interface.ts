import { Document } from 'mongoose';

export interface IUserToken extends Document {
  readonly user: string;
  readonly token: string;
}
