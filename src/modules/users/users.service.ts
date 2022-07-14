import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEmailDto } from 'src/dtos/users/user-email.dto';
import { IUser } from 'src/interfaces/users/IUser.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    readonly cloudinaryService: CloudinaryService,
  ) {}

  async getUsersCount(): Promise<number> {
    try {
      return await this.userModel.find().count();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUser(email: UserEmailDto): Promise<IUser | undefined> {
    try {
      return await this.userModel.findOne({ email });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updatePassword(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    try {
      return await this.userModel.findOneAndUpdate(
        { email: email },
        { password },
        { returnDocument: 'after' },
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadNewImage(
    file: Express.Multer.File,
    userId: string,
  ): Promise<IUser> {
    try {
      const uploadedImg = await this.cloudinaryService.uploadImage(file);

      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { imageUrl: uploadedImg },
        { returnDocument: 'after' },
      );

      return updatedUser;
    } catch (e) {
      throw new Error(e);
    }
  }
}
