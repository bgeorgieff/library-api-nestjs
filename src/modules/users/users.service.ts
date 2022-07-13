import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEmailDto } from 'src/dtos/users/user-email.dto';
import { IUser } from 'src/interfaces/users/IUser.interface';
import { Upload } from 'src/upload.cloudinary';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UsersService extends Upload {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    readonly cloudinaryService: CloudinaryService,
  ) {
    super(cloudinaryService);
  }

  async getUsersCount(): Promise<number> {
    return await this.userModel.find().count();
  }

  async getUser(email: UserEmailDto): Promise<IUser | undefined> {
    return await this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    return await this.userModel.findOne({ _id: id });
  }

  async updatePassword(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    return await this.userModel.findOneAndUpdate(
      { email: email },
      { password },
      { returnDocument: 'after' },
    );
  }

  async uploadNewImage(
    file: Express.Multer.File,
    userId: string,
  ): Promise<IUser> {
    const uploadedImg = await super.uploadImage(file);

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { imageUrl: uploadedImg },
      { returnDocument: 'after' },
    );

    return updatedUser;
  }
}
