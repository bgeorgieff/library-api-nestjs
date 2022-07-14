import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ExtractUser } from 'src/decorators/extract-user.decorator';
import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { IRentView } from 'src/interfaces/rents/IRentsView.interface';
import { IUserPayload } from 'src/interfaces/users/IUserPayload.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RentsService } from './rents.service';

@Controller(Area.Rents)
@ApiTags(Area.Rents)
@ApiBearerAuth()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(Endpoint.RentBook)
  @ApiParam({ name: 'id', type: String })
  requestRent(
    @ExtractUser() user: IUserPayload,
    @Param('id') id: string,
  ): Promise<{ message: string } | undefined> {
    return this.rentsService.requestBook(id, user._id, user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Endpoint.ApproveRent)
  @ApiParam({ name: 'id', type: String })
  ApproveRent(
    @ExtractUser() user: IUserPayload,
    @Param('id') id: string,
  ): Promise<{ message: string } | undefined> {
    if (user.isAdmin) {
      return this.rentsService.approveBook(id, user._id);
    } else {
      throw new BadRequestException('User must be admin');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(Endpoint.MarkAsReturned)
  @ApiParam({ name: 'id', type: String })
  returnBook(
    @ExtractUser() user: IUserPayload,
    @Param('id') id: string,
  ): Promise<{ message: string } | undefined> {
    if (user.isAdmin) {
      return this.rentsService.markAsReturned(id);
    } else {
      throw new BadRequestException('User must be admin');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(Endpoint.GetApprovedRents)
  getApprovedRents(
    @ExtractUser() user: IUserPayload,
  ): Promise<IRentView[] | undefined> {
    return this.rentsService.getAllApproved(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(Endpoint.GetReturnedRents)
  getAllReturned(
    @ExtractUser() user: IUserPayload,
  ): Promise<IRentView[] | undefined> {
    return this.rentsService.getReturnedBooks(user._id);
  }
}
