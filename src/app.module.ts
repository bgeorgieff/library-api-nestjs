import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './config.root';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { GenresModule } from './modules/genres/genres.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { MessagesModule } from './modules/messages/messages.module';
import { ResetPassModule } from './reset-pass/reset-pass.module';
import { RentsModule } from './modules/rents/rents.module';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    BooksModule,
    AuthModule,
    AuthorsModule,
    GenresModule,
    CommentsModule,
    CloudinaryModule,
    MulterModule,
    MessagesModule,
    ResetPassModule,
    RentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
