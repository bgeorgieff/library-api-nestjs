import { ApiProperty } from '@nestjs/swagger';

export class UserResetPasswordDto {
  @ApiProperty()
  newPassword: string;
}
