import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Vishal' })
  @IsString()
  @IsNotEmpty()
  sender!: string;

  @ApiProperty({ example: 'Hello world' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ example: 'room1' })
  @IsString()
  @IsNotEmpty()
  room!: string;
}
