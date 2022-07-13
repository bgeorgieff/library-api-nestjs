import { ApiProperty } from '@nestjs/swagger';
import { IMessage } from 'src/interfaces/messages/IMessage.interface';

export class CreateMessageDto implements IMessage {
  @ApiProperty()
  recipientId: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  content: string;

  @ApiProperty()
  _id;
}
