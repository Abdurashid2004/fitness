import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 'Basic',
    description: 'Name of the subscription',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 10.99,
    description: 'Price of the subscription',
  })
  @IsNumber()
  readonly price: number;
}
