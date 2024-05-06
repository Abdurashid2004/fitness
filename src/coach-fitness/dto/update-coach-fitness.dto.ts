import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class UpdateCoachFitnessDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the coach' })
  @IsOptional()
  @IsNumber()
  readonly coachId?: number;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the fitness type',
  })
  @IsOptional()
  @IsNumber()
  readonly fitnessTypeId?: number;

  @ApiProperty({
    example: 100.0,
    description: 'Price for the coach fitness service',
  })
  @IsOptional()
  @IsDecimal()
  readonly price?: number;
}
