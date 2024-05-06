import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateFitnessTypeDto {
  @ApiProperty({ example: 'Yoga', description: 'Name of the fitness type' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    example: 'A series of physical, mental, and spiritual practices',
    description: 'Description of the fitness type',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
