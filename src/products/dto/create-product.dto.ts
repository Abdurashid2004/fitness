import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'Name of the product',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 10.99,
    description: 'Price of the product',
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 'Product Description',
    description: 'Description of the product',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'product.jpg',
    description: 'Photo URL of the product',
  })
  @IsString()
  readonly photo: string;
}
