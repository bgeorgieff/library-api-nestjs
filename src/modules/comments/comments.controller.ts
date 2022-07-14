import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from '../../dtos/comments/comment.dto';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { Area } from 'src/enums/area-names.enum';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller(Area.Comment)
@ApiTags(Area.Comment)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBody({ type: CommentDto })
  create(@Body() createCommentDto: CommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get(Endpoint.CommentsOfBook)
  @ApiParam({ name: 'id', type: String })
  findBookComments(@Param('id') bookId: string) {
    return this.commentsService.getBookComments(bookId);
  }
}
