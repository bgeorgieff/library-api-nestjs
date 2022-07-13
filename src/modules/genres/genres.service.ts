import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from 'src/dtos/genres/create-genre.dto';
import { UpdateGenreDto } from 'src/dtos/genres/update-genre.dto';
import { GenericCrudService } from 'src/generic-crud-service';
import { Genre, GenreDocument } from 'src/schemas/genre.schema';

@Injectable()
export class GenresService extends GenericCrudService<
  GenreDocument,
  CreateGenreDto,
  UpdateGenreDto
> {
  constructor(@InjectModel(Genre.name) private genres: Model<GenreDocument>) {
    super(genres);
  }
}
