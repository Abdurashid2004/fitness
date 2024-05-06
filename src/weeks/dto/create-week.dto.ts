import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWeekDto {
  @ApiProperty({ example: 'Monday', description: 'The name of the week' })
  @IsString()
  readonly name: string;
}
