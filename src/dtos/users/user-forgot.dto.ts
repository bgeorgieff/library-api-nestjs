import { ApiProperty } from '@nestjs/swagger';

export class UserForgotPasswordDto {
  @ApiProperty()
  email: string;
}
