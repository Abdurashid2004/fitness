import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateFitnessOrderDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the fitness order',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ example: 1, description: 'ID of the payment' })
  @IsOptional()
  @IsNumber()
  readonly paymentId?: number;

  @ApiProperty({
    example: 100,
    description: 'Total price of the fitness order',
  })
  @IsOptional()
  @IsNumber()
  readonly total_price?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the coach associated with the order',
  })
  @IsOptional()
  @IsNumber()
  readonly coachId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the client associated with the order',
  })
  @IsOptional()
  @IsNumber()
  readonly clientId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the subscription associated with the order',
  })
  @IsOptional()
  @IsNumber()
  readonly subscriptionId?: number;

  @ApiProperty({ example: 1, description: 'ID of the status of the order' })
  @IsOptional()
  @IsNumber()
  readonly fitnessOrderstatusId?: number;
}
