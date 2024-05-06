import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'patient',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: '+998950570421',
    required: true,
  })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    example: 'patient@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123Uzb#',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '123Uzb#',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: 'pat@tg_link',
    required: true,
  })
  @IsString()
  tg_link: string;

  @ApiProperty({
    example: 'pat_image',
    required: true,
  })
  @IsString()
  photo: string;

  //   @IsDateString()
  //   birth_date: Date;

  @ApiProperty({
    example: 'mack_street',
    required: true,
  })
  @IsString()
  address: string;
}
