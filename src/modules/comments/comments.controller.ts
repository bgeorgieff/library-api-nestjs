import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../../dtos/comments/create-comment.dto';
import { UpdateCommentDto } from '../../dtos/comments/update-comment.dto';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { Area } from 'src/enums/area-names.enum';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller(Area.Comment)
@ApiTags(Area.Comment)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(Endpoint.CommentsOfUser)
  @ApiParam({ name: 'id', type: String })
  getUserComment(@Param('id') userId: string) {
    return this.commentsService.getUserComments(userId);
  }

  @Get(Endpoint.CommentsOfBook)
  @ApiParam({ name: 'id', type: String })
  getBookComment(@Param('id') bookId: string) {
    return this.commentsService.getBookComments(bookId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Patch(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCommentDto })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
