import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto } from 'src/dtos/authors/create-author.dto';
import { UpdateAuthorDto } from 'src/dtos/authors/update-author.dto';
import { Area } from 'src/enums/area-names.enum';
import { Endpoint } from 'src/enums/endpoint-names.enum';
import { AuthorsService } from './authors.service';

@Controller(Area.Authors)
@ApiTags(Area.Authors)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiBody({ type: CreateAuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Patch(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAuthorDto })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(Endpoint.ById)
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
