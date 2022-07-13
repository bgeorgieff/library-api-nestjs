import { ApiProperty } from '@nestjs/swagger';
import { IComment } from 'src/interfaces/comments/IComment.interface';

export class CreateCommentDto implements IComment {
  @ApiProperty()
  rating: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  bookId: string;
}
