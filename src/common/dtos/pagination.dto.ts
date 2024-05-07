import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Limit of items per page',
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enableImplicitConversion: true
  limit?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'Offset of items per page',
    default: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number) // enableImplicitConversion: true
  offset?: number;
}
