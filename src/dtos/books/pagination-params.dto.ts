import { ApiProperty } from '@nestjs/swagger';

export class PaginationParamsDto {
  @ApiProperty()
  pageNumber?: number;

  @ApiProperty()
  pageSize?: number;

  @ApiProperty()
  searchStr?: string;
}
