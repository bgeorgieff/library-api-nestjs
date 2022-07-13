import { ApiProperty } from '@nestjs/swagger';
import { IGenre } from 'src/interfaces/genres/IGenre.interface';

export class CreateGenreDto implements IGenre {
  @ApiProperty()
  name: string;
}
