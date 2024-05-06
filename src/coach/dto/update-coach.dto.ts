import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoachDto {
  @ApiProperty({ description: 'The full name of the coach', required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  full_name?: string;

  @ApiProperty({ description: 'The photo URL of the coach', required: false })
  @IsOptional()
  @IsUrl()
  photo?: string;

  @ApiProperty({
    description: 'The Telegram link of the coach',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  tg_link?: string;

  @ApiProperty({
    description: 'The phone number of the coach',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Indicates whether the coach is active',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  is_active?: boolean;
}
