import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDate } from 'class-validator';

export class UpdateCoachWorkingDayDto {
  @ApiProperty({ example: 1, description: 'The ID of the coach' })
  @IsOptional()
  @IsNumber()
  readonly coachId?: number;

  @ApiProperty({ example: 1, description: 'The ID of the week' })
  @IsOptional()
  @IsNumber()
  readonly weekId?: number;

  @ApiProperty({
    example: '2024-05-03T09:00:00Z',
    description: 'Start time of the working day',
  })
  @IsOptional()
  @IsDate()
  readonly start_time?: Date;

  @ApiProperty({
    example: '2024-05-03T17:00:00Z',
    description: 'End time of the working day',
  })
  @IsOptional()
  @IsDate()
  readonly end_time?: Date;
}
