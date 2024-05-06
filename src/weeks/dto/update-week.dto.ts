import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateWeekDto {
  @ApiProperty({ example: 'Monday', description: 'The name of the week' })
  @IsString()
  readonly name?: string;
}
