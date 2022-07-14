import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Books, BooksSchema } from '../../schemas/books.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { Genre, GenreSchema } from 'src/schemas/genre.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
// import { Upload } from '../../upload.cloudinary';
import { AuthorsService } from '../authors/authors.service';
import { GenresService } from '../genres/genres.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  providers: [
    BooksService,
    CloudinaryService,
    // Upload,
    AuthorsService,
    GenresService,
  ],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
