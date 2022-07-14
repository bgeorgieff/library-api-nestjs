import { ApiProperty } from '@nestjs/swagger';
import { IBook } from 'src/interfaces/books/IBooks.interface';

export class CommentDto {
  @ApiProperty()
  rating: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  bookId: IBook;
}
