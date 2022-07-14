import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthorDto } from 'src/dtos/authors/author.dto';

import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { AuthorsService } from './authors.service';

@Controller(Area.Authors)
@ApiTags(Area.Authors)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiBody({ type: AuthorDto })
  create(@Body() authorDto: AuthorDto) {
    return this.authorsService.createAuthor(authorDto);
  }

  @Get()
  @ApiBody({ type: AuthorDto })
  findAllBooksByAuthor(@Body() authorDto: AuthorDto) {
    return this.authorsService.findAllByAuthor(authorDto);
  }

  @Get(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.authorsService.findAuthor(id);
  }
}
