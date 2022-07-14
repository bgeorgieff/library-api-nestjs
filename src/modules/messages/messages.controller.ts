import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Sse,
  UseGuards,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dtos/messages/create-message.dto';
import { Observable } from 'rxjs/internal/Observable';
import { interval, map, skipWhile } from 'rxjs';
import { Area } from 'src/enums/area-names.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExtractUser } from 'src/decorators/extract-user.decorator';
import { IUserPayload } from 'src/interfaces/users/IUserPayload.interface';
import { IMessage } from 'src/interfaces/messages/IMessage.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Endpoint } from 'src/enums/endpoint-names.enum';

@ApiBearerAuth()
@Controller(Area.Messages)
@ApiTags(Area.Messages)
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  // currAdminMsg = {};
  // prevAdminMsg = {};
  // currUserMsg = {};
  // prevUserMsg = {};

  // getAdminMsg() {
  //   if (this.currAdminMsg !== this.prevAdminMsg) {
  //     this.prevAdminMsg = this.currAdminMsg;
  //     return this.currAdminMsg;
  //   } else {
  //     return null;
  //   }
  // }

  // getUserMsg() {
  //   if (this.currUserMsg !== this.prevUserMsg) {
  //     this.prevUserMsg = this.currUserMsg;
  //     return this.currUserMsg;
  //   } else {
  //     return null;
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post(Endpoint.MessageToAdmin)
  // @ApiBody({ type: CreateMessageDto })
  // async toAdmin(@Body() message: CreateMessageDto) {
  //   const msg = await this.messages.toAdmin(message);
  //   this.currAdminMsg = msg;
  //   return msg;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post(Endpoint.MessageToUser)
  // @ApiBody({ type: CreateMessageDto })
  // async toUser(
  //   @ExtractUser() user: IUserPayload,
  //   @Body() message: CreateMessageDto,
  // ): Promise<{ message: string } | undefined> {
  //   if (user.isAdmin) {
  //     return await this.messages.toUser(message);
  //   } else {
  //     throw new BadRequestException('User is not admin');
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get(Endpoint.GetAllAdminMessages)
  // async AllOfAdmin(@ExtractUser() user: IUserPayload) {
  //   if (user.isAdmin) {
  //     return await this.messages.ofAdmin();
  //   } else {
  //     throw new BadRequestException('User is not admin');
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get(Endpoint.GetAllUserMessages)
  // async AllOfUser(@ExtractUser() user: IUserPayload) {
  //   return await this.messages.AllOfUser(user._id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Sse(Endpoint.SubscribeUser)
  // @ApiExcludeEndpoint()
  // ofUser(): Observable<any> {
  //   return interval(1000).pipe(
  //     map(() => ({ data: this.getUserMsg() })),
  //     skipWhile((msg) => msg.data === null),
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Sse(Endpoint.SubscribeAdmin)
  // @ApiExcludeEndpoint()
  // ofAdmin(@ExtractUser() user: IUserPayload): Observable<any> {
  //   if (user.isAdmin) {
  //     return interval(1000).pipe(
  //       map(() => ({ data: this.getAdminMsg() })),
  //       skipWhile((msg) => msg.data === null),
  //     );
  //   } else {
  //     throw new BadRequestException('User is not admin');
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get(Endpoint.ById)
  // @ApiParam({ name: 'id', type: String })
  // findOne(@Param('id') id: string) {
  //   return this.messages.getOne(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch()
  // @ApiBody({ type: IMessage })
  // editOne(@Body() message: IMessage) {
  //   return this.messages.updateOne(message);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(Endpoint.ById)
  // @ApiParam({ name: 'id', type: String })
  // remove(@Param('id') id: string) {
  //   return this.messages.deleteOne(id);
  // }
}
