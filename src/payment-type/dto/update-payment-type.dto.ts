import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentTypeDto {
  @ApiProperty({
    example: 'Credit Card',
    description: 'Name of the payment type',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
