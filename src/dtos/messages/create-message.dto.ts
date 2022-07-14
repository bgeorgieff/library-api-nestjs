import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  recipientId: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  content: string;

  @ApiProperty()
  _id?: string;
}
