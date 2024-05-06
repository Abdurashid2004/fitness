import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDecimal } from 'class-validator';

export class CreateCoachFitnessDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the coach' })
  @IsNumber()
  readonly coachId: number;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the fitness type',
  })
  @IsNumber()
  readonly fitnessTypeId: number;

  @ApiProperty({
    example: 100.0,
    description: 'Price for the coach fitness service',
  })
  @IsDecimal()
  readonly price: number;
}
