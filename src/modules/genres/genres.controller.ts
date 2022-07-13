import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { CreateGenreDto } from 'src/dtos/genres/create-genre.dto';
import { UpdateGenreDto } from 'src/dtos/genres/update-genre.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller(Area.Genres)
@ApiTags(Area.Genres)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiBody({ type: CreateGenreDto })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get(Endpoint.Count)
  count() {
    return this.genresService.model.find().count();
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateGenreDto })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
