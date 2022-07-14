import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { UserRegisterDto } from 'src/dtos/users/user-register.dto';
import { UserResetPasswordDto } from 'src/dtos/users/user-reset-password.dto';
import { UserEmailDto } from 'src/dtos/users/user-email.dto';
import { AuthService } from '../auth/auth.service';
import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { TokenDto } from 'src/dtos/users/token.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller(Area.Auth)
@ApiTags(Area.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Endpoint.Register)
  @ApiBody({ type: UserRegisterDto })
  register(@Body() user: UserRegisterDto) {
    return this.authService.userRegister(user);
  }

  @Post(Endpoint.CheckToken)
  @ApiBody({ type: TokenDto })
  validateToken(@Query('email') email: UserEmailDto, @Body() token: TokenDto) {
    return this.authService.validateToken(email, token);
  }

  @Post(Endpoint.ForgotPassword)
  @ApiBody({ type: UserEmailDto })
  forgotPassword(
    @Body('email') email: UserEmailDto,
  ): Promise<{ message: string } | BadRequestException> {
    return this.authService.forgotPassword(email);
  }

  @UseGuards(LocalAuthGuard)
  @Post(Endpoint.Login)
  @ApiBody({ type: UserEmailDto })
  login(@Body('email') email: UserEmailDto) {
    return this.authService.login(email);
  }

  @Patch(Endpoint.ResetPassword)
  @ApiBody({ type: UserResetPasswordDto })
  resetPassword(
    @Query('email') email: string,
    @Body() userResetPasswordDto: UserResetPasswordDto,
  ) {
    return this.authService.resetPassword(email, userResetPasswordDto);
  }
}
