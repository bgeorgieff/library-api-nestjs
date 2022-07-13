import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
