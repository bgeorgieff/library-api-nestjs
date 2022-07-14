import {
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { Express } from 'express';
import { IUser } from 'src/interfaces/users/IUser.interface';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { Area } from 'src/enums/area-names.enum';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller(Area.Users)
@ApiTags(Area.Users)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(Endpoint.Count)
  usersCount(): Promise<number> {
    return this.userService.getUsersCount();
  }

  @Get(Endpoint.GetUser)
  getUserDetails(@Param('id') userId: string): Promise<IUser> {
    return this.userService.getUserById(userId);
  }

  @Patch(Endpoint.UploadImg)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({ name: 'id', type: String })
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<IUser> {
    return this.userService.uploadNewImage(file, id);
  }
}
