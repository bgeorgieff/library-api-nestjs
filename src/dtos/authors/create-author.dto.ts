import { ApiProperty } from '@nestjs/swagger';
import { IAuthor } from 'src/interfaces/authors/IAuthor.interface';

export class CreateAuthorDto implements IAuthor {
  @ApiProperty()
  name: string;

  @ApiProperty()
  biography: string;
}
