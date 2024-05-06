import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: 'Product Name Updated',
    description: 'Updated name of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    example: 15.99,
    description: 'Updated price of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @ApiProperty({
    example: 'Updated Product Description',
    description: 'Updated description of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: 'updated_product.jpg',
    description: 'Updated photo URL of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly photo?: string;
}
