import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from 'src/schemas/author.schema';
import { AuthorDto } from '../../dtos/authors/author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authors: Model<AuthorDocument>,
  ) {}

  async createAuthor(author: AuthorDto) {
    try {
      const { name, bio, bookId } = author;
      return await new this.authors({ name, bio, bookId }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAllByAuthor(author: AuthorDto) {
    try {
      const { name } = author;
      return await this.authors.find({ name });
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAuthor(_id: string) {
    try {
      return await this.authors.findOne({ _id });
    } catch (e) {
      throw new Error(e);
    }
  }
}
