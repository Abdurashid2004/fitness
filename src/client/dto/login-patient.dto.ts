import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginClientDto {
  @ApiProperty({
    example: 'pat@gmal.com',
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
  password: string;
}
