import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductOrderDto {
  @ApiProperty({
    example: 1,
    description: 'Client ID associated with the product order',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly clientId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the status of the product order',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly productOrderStatusId?: number;
}
