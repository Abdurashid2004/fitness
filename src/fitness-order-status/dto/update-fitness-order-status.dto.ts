import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateFitnessOrderStatusDto {
  @ApiProperty({
    example: 'Pending',
    description: 'Name of the fitness order status',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;
}
