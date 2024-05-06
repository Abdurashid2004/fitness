import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDate, MinDate } from 'class-validator';

export class UpdateClientDayDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the client' })
  @IsInt()
  @IsNotEmpty()
  clientId?: number;

  @ApiProperty({ example: 1, description: 'Unique identifier of the week' })
  @IsInt()
  @IsNotEmpty()
  weekId?: number;

  @ApiProperty({
    example: '2024-05-04T08:00:00Z',
    description: 'Start time of the client day',
  })
  @IsDate()
  @MinDate(new Date())
  @IsNotEmpty()
  startTime?: Date;

  @ApiProperty({
    example: '2024-05-04T17:00:00Z',
    description: 'End time of the client day',
  })
  @IsDate()
  @MinDate(new Date())
  @IsNotEmpty()
  endTime?: Date;
}
