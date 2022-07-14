import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { GenreDto } from 'src/dtos/genres/genre.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller(Area.Genres)
@ApiTags(Area.Genres)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: GenreDto })
  create(@Body() createGenreDto: GenreDto) {
    return this.genresService.createNewGenre(createGenreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(Endpoint.Count)
  findGenresCount() {
    return this.genresService.genresCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBody({ type: GenreDto })
  findBooksByGenre(@Body() name: GenreDto) {
    return this.genresService.findAllByGenre(name);
  }
}
