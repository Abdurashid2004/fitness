import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFitnessOrderStatusDto {
  @ApiProperty({
    example: 'Pending',
    description: 'Name of the fitness order status',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
