import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericCrudService } from 'src/generic-crud-service';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from '../../dtos/comments/create-comment.dto';
import { UpdateCommentDto } from '../../dtos/comments/update-comment.dto';

@Injectable()
export class CommentsService extends GenericCrudService<
  CommentDocument,
  CreateCommentDto,
  UpdateCommentDto
> {
  constructor(
    @InjectModel(Comment.name) private comments: Model<CommentDocument>,
  ) {
    super(comments);
  }

  //TODO
  //Add rating

  async getUserComments(userId: string) {
    return await this.comments.find({ userId: userId });
  }

  async getBookComments(bookId: string) {
    return await this.comments.find({ bookId: bookId });
  }
}
