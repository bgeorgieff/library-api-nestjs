import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from 'src/interfaces/messages/IMessage.interface';
import {
  AdminMessage,
  AdminMessageDocument,
} from 'src/schemas/messages-admin.schema';
import { Message, MessageDocument } from 'src/schemas/messages.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private userMessages: Model<MessageDocument>,
    @InjectModel(AdminMessage.name)
    private adminMessages: Model<AdminMessageDocument>,
  ) {}

  async getOne(id: string) {
    const admin = await this.adminMessages.findOne({ _id: id });
    const user = await this.userMessages.findOne({ _id: id });
    return admin ?? user;
  }

  async deleteOne(id: string) {
    const admin = await this.adminMessages.findOneAndDelete({ _id: id });
    const user = await this.userMessages.findOneAndDelete({ _id: id });
    return admin ?? user;
  }

  async updateOne(message: IMessage) {
    const admin = await this.adminMessages.findByIdAndUpdate(
      { _id: message._id },
      message,
    );
    const user = await this.userMessages.findByIdAndUpdate(
      { _id: message._id },
      message,
    );
    return admin ?? user;
  }

  async toAdmin(message: IMessage) {
    return await (await this.adminMessages.create(message)).save();
  }

  async toUser(message: IMessage) {
    return await (await this.userMessages.create(message)).save();
  }

  async ofAdmin() {
    return await this.adminMessages.find();
  }

  async AllOfUser(userId: string) {
    return await this.userMessages.find({ recipientId: userId });
  }
}
