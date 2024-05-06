import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoachDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'hashedPassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'hashedPassword123',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({ description: 'The gender of the user', example: 'male' })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'The birth date of the user',
    example: '1990-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;

  @ApiProperty({
    description: 'The photo URL of the user',
    example: 'https://example.com/photo.jpg',
  })
  @IsOptional()
  @IsUrl()
  photo: string;

  @ApiProperty({
    description: 'The Telegram link of the user',
    example: 'https://t.me/johndoe',
  })
  @IsOptional()
  @IsUrl()
  tg_link: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Indicates whether the user is active',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: 'Indicates whether the user is an owner',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_owner: boolean;
}
