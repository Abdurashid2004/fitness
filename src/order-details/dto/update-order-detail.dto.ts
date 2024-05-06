import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order-detail.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
  @ApiProperty({
    example: 1,
    description: 'ID of the product',
  })
  productId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the order to which this detail belongs',
  })
  product_orderId?: number;
}
