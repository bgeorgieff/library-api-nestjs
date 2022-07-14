import { ApiProperty } from '@nestjs/swagger';

export class BooksDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  count: number;

  @ApiProperty()
  cover: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: string[];

  @ApiProperty()
  genres: string[];
}
