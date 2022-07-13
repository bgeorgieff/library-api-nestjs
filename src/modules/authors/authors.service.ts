import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericCrudService } from 'src/generic-crud-service';
import { Author, AuthorDocument } from 'src/schemas/author.schema';
import { CreateAuthorDto } from '../../dtos/authors/create-author.dto';
import { UpdateAuthorDto } from '../../dtos/authors/update-author.dto';

@Injectable()
export class AuthorsService extends GenericCrudService<
  AuthorDocument,
  CreateAuthorDto,
  UpdateAuthorDto
> {
  constructor(
    @InjectModel(Author.name) private authors: Model<AuthorDocument>,
  ) {
    super(authors);
  }
}
