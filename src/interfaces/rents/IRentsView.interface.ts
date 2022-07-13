import { Document } from 'mongoose';

export interface IRentView extends Document {
  readonly bookId: string;
  readonly bookTitle: string;
  readonly bookCover: string;
  readonly user: string;
  readonly userEmail: string;
  readonly dateRented?: Date;
  readonly dateForReturn?: Date;
  readonly isApproved: boolean;
  readonly isReturned: boolean;
}
