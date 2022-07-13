import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksDto } from 'src/dtos/books/book.dto';
import { IBook } from 'src/interfaces/books/IBooks.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
// import { Upload } from '../../upload.cloudinary';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private readonly booksModel: Model<IBook>,
    readonly cloudinaryService: CloudinaryService,
  ) {}

  async addNewBook(file: Express.Multer.File, book: BooksDto): Promise<IBook> {
    const uploadedImg = await this.cloudinaryService.uploadImage(file);

    const bookParamsWithImg: BooksDto = {
      title: book.title,
      isAvailable: book.isAvailable,
      cover: uploadedImg.toString(),
      count: book.count,
      description: book.description,
    };

    const newBook = new this.booksModel(bookParamsWithImg);

    return await newBook.save();
  }

  async addBookQty(id: string, count: number): Promise<IBook> {
    return await this.booksModel.findOneAndUpdate(
      { _id: id },
      { count },
      { returnDocument: 'after' },
    );
  }

  async getNewlyAdded(): Promise<IBook[]> {
    return await this.booksModel.find().sort({ createdAt: -1 }).limit(9);
  }

  async getBooksCount() {
    return await this.booksModel.find().count();
  }

  async getBook(id: string): Promise<IBook> {
    return await this.booksModel.findById(id);
  }

  async getAllBooks(
    pageNumber?: number,
    pageSize?: number,
    searchStr?: string,
  ): Promise<[IBook[], number]> {
    const response = this.booksModel
      .find()
      .sort({ _id: 1 })
      .populate('authors')
      .populate('genres');

    if (searchStr) {
      response.find({
        $or: [{ title: searchStr }, { description: searchStr }],
      });
    }

    if (pageNumber > 0 && pageSize > 0) {
      const skipCount = (pageNumber - 1) * pageSize;
      response.skip(skipCount);
    } else {
      response.skip(0);
    }

    if (pageSize) {
      response.limit(pageSize);
    }

    const results = await response;
    const count = await this.booksModel.count();

    if (pageSize && pageSize > 0) {
      const pageQty = Math.ceil(count / pageSize);
      return [results, pageQty];
    } else {
      return [results, 1];
    }
  }

  async uploadCover(file: Express.Multer.File, id: string): Promise<IBook> {
    const uploadedImg = await this.cloudinaryService.uploadImage(file);

    return await this.booksModel.findOneAndUpdate(
      { _id: id },
      { cover: uploadedImg.url },
      { returnDocument: 'after' },
    );
  }
}
