import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the payment type',
  })
  paymentTypeId: number;

  @ApiProperty({
    example: true,
    description: 'Flag indicating whether the payment is paid',
  })
  is_paid: boolean;

  @ApiProperty({
    example: '2024-05-03T00:00:00Z',
    description: 'Start date of the payment period',
  })
  start_date: Date;

  @ApiProperty({
    example: '2024-06-03T00:00:00Z',
    description: 'End date of the payment period',
  })
  end_date: Date;

  @ApiProperty({
    example: 100,
    description: 'Amount of the payment',
  })
  amount: number;
}
