import { ApiProperty } from '@nestjs/swagger';
import { IBook } from 'src/interfaces/books/IBooks.interface';

export class AuthorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  bookId: IBook[];
}
