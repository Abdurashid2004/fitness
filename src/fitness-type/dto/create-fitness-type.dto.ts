import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFitnessTypeDto {
  @ApiProperty({ example: 'Yoga', description: 'Name of the fitness type' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'A series of physical, mental, and spiritual practices',
    description: 'Description of the fitness type',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
