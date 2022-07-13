import { ApiProperty } from '@nestjs/swagger';

export class UserResetPasswordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  newPassword: string;
}
