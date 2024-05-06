import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFitnessOrderDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the fitness order',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 1, description: 'ID of the payment' })
  @IsNotEmpty()
  @IsNumber()
  readonly paymentId: number;

  @ApiProperty({
    example: 100,
    description: 'Total price of the fitness order',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly total_price: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the coach associated with the order',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly coachId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the client associated with the order',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly clientId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the subscription associated with the order',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly subscriptionId: number;

  @ApiProperty({ example: 1, description: 'ID of the status of the order' })
  @IsNotEmpty()
  @IsNumber()
  readonly fitnessOrderstatusId: number;
}
