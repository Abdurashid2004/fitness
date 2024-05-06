import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDetailDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the product',
  })
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the order to which this detail belongs',
  })
  @IsNotEmpty()
  @IsInt()
  product_orderId: number;
}
