import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @ApiProperty({
    example: 'Credit Card',
    description: 'Name of the payment type',
  })
  @IsString()
  readonly name: string;
}
