import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreDto } from 'src/dtos/genres/genre.dto';
import { IGenre } from 'src/interfaces/genres/IGenre.interface';
import { Genre } from 'src/schemas/genre.schema';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private genres: Model<IGenre>) {}

  async createNewGenre(createGenreDto: GenreDto) {
    try {
      const { name, bookId } = createGenreDto;
      return await new this.genres({ name, bookId }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async genresCount() {
    try {
      return await this.genres.find().count();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAllByGenre(genres: GenreDto) {
    const { name } = genres;
    try {
      return await this.genres.find({ name });
    } catch (e) {
      throw new Error(e);
    }
  }
}
