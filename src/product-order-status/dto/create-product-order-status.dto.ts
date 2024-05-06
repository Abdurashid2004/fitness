import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductOrderStatusDto {
  @ApiProperty({
    example: 'Processing',
    description: 'Name of the product order status',
  })
  @IsString()
  readonly name: string;
}
