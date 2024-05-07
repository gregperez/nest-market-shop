import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  readonly password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  readonly fullName: string;
}
