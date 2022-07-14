import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/enums/token.enums';
import { IUserToken } from 'src/interfaces/users/IUserToken.interface';

@Injectable()
export class ResetPassService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<IUserToken>,
  ) {}

  async getLatestToken(userId: string): Promise<IUserToken | null> {
    try {
      const date = new Date();
      date.setMinutes(date.getMinutes() - Token.expirationMinutes);
      const user = await this.tokenModel
        .findOne({ user: userId, createdAt: { $gte: date } })
        .sort({ createdAt: -1 });

      return user ? user : null;
    } catch (e) {
      throw new Error(e);
    }
  }
}
