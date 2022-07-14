import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CommentDto } from '../../dtos/comments/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private comments: Model<CommentDocument>,
  ) {}

  async createComment(comment: CommentDto) {
    try {
      const { rating, content, bookId, userId } = comment;

      return await new this.comments({
        rating,
        content,
        bookId,
        userId,
      }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getBookComments(bookId: string) {
    try {
      return await this.comments.find({ bookId: bookId });
    } catch (e) {
      throw new Error(e);
    }
  }
}
