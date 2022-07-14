import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { Email } from '../../enums/email-template.enum';
import { UserEmailDto } from 'src/dtos/users/user-email.dto';
import { UserResetPasswordDto } from 'src/dtos/users/user-reset-password.dto';
import { IUserToken } from 'src/interfaces/users/IUserToken.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRegisterDto } from 'src/dtos/users/user-register.dto';
import { IUser } from 'src/interfaces/users/IUser.interface';
import { ResetPassService } from 'src/reset-pass/reset-pass.service';
import { Token } from 'src/enums/token.enums';
import { generateTokenString } from 'src/helpers/generateTokenString';
import { TokenDto } from 'src/dtos/users/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sendGrid: SendgridService,
    private readonly resetPassService: ResetPassService,
    @InjectModel('Token') private readonly tokenModel: Model<IUserToken>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async userRegister(user: UserRegisterDto) {
    const saltRounds = Token.saltRounds;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const newUser = new this.userModel(user);
    await newUser.save();

    return {
      msg: 'User successfully registered',
      userId: newUser._id,
      email: newUser.email,
    };
  }

  async login(userMail: UserEmailDto) {
    const { email, isAdmin, _id } = await this.usersService.getUser(userMail);
    const payload = { email, isAdmin, _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: UserEmailDto, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async resetPassword(
    userEmail: string,
    updatePasswordDto: UserResetPasswordDto,
  ) {
    const { newPassword } = updatePasswordDto;
    const saltRounds = Token.saltRounds;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const user = await this.usersService.updatePassword(
      userEmail,
      hashedPassword,
    );

    await this.tokenModel.deleteMany({ user: user._id });

    return { message: 'Password successfully reset' };
  }

  async forgotPassword(
    email: UserEmailDto,
  ): Promise<{ message: string } | BadRequestException> {
    const user = await this.usersService.getUser(email);

    if (user) {
      const token = generateTokenString();

      const newToken = new this.tokenModel({ user, token });
      await newToken.save();

      const email = {
        to: user.email,
        subject: Email.forgotPassSubject,
        from: process.env.SENDER_EMAIL,
        html: Email.forgotPassword(token),
      };

      await this.sendGrid.send(email);

      return { message: `Message sent to ${email.to}` };
    } else {
      throw new BadRequestException('Invalid user');
    }
  }

  async validateToken(email: UserEmailDto, tokenDto: TokenDto) {
    const { token } = tokenDto;
    const user = await this.usersService.getUser(email);
    const userToken = await this.resetPassService.getLatestToken(user._id);

    if (!userToken) {
      throw new BadRequestException('Token has expired!');
    }

    if (token !== userToken.token) {
      throw new BadRequestException('Wrong token provided!');
    }

    return { message: 'Token is validated' };
  }
}
