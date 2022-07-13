import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { BooksService } from './books.service';
import { BooksDto } from 'src/dtos/books/book.dto';
import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { IBook } from 'src/interfaces/books/IBooks.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExtractUser } from 'src/decorators/extract-user.decorator';
import { IUserPayload } from 'src/interfaces/users/IUserPayload.interface';
import { PaginationParamsDto } from 'src/dtos/books/pagination-params.dto';

@Controller(Area.Books)
@ApiTags(Area.Books)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post(Endpoint.AddBook)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        isAvailable: { type: 'boolean' },
        count: { type: 'boolean' },
        cover: {
          type: 'string',
          format: 'binary',
        },
        authors: { type: 'array' },
        genres: { type: 'array' },
        description: { type: 'string' },
      },
    },
  })
  async addBook(
    @ExtractUser() user: IUserPayload,
    @UploadedFile() file: Express.Multer.File,
    @Body() book: BooksDto,
  ): Promise<IBook> {
    if (user.isAdmin) {
      return this.booksService.addNewBook(file, book);
    } else {
      throw new BadRequestException('User must be admin!');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(Endpoint.UploadImg)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({ name: 'id', type: 'string' })
  async uploadPhotos(
    @ExtractUser() user: IUserPayload,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<IBook> {
    if (user.isAdmin) {
      return this.booksService.uploadCover(file, id);
    } else {
      throw new BadRequestException('User must be admin!');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(Endpoint.UpdateQty)
  async addBookQty(
    @ExtractUser() user: IUserPayload,
    @Param('id') id: string,
    @Body() _: { count: number },
  ) {
    if (user.isAdmin) {
      return this.booksService.addBookQty(id, _.count);
    } else {
      throw new BadRequestException('User must be admin!');
    }
  }

  @Get(Endpoint.NewlyAddedBooks)
  async getNewlyAddedBooks(): Promise<IBook[]> {
    return this.booksService.getNewlyAdded();
  }

  @Get(Endpoint.Count)
  async getBooksCount(): Promise<number> {
    return await this.booksService.getBooksCount();
  }

  @Get(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  async getBookById(@Param('id') id: string): Promise<IBook> {
    return this.booksService.getBook(id);
  }

  @Get()
  @ApiQuery({
    name: 'filters',
    type: 'object',
    schema: { $ref: getSchemaPath(PaginationParamsDto) },
  })
  async getBooks(
    @Query() { pageNumber, pageSize, searchStr }: PaginationParamsDto,
  ): Promise<[IBook[], number]> {
    return this.booksService.getAllBooks(pageNumber, pageSize, searchStr);
  }

  // TODO
  // Rent book endpoint
}
