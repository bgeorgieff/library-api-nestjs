import { ApiProperty } from '@nestjs/swagger';
import { IBook } from 'src/interfaces/books/IBooks.interface';

export class GenreDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  bookId: IBook[];
}
