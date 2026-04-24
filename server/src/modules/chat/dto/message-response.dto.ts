import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty()
  _id: string | undefined;

  @ApiProperty()
  sender: string | undefined;

  @ApiProperty()
  content: string | undefined;

  @ApiProperty()
  room: string | undefined;

  @ApiProperty()
  createdAt: Date | undefined;

  @ApiProperty()
  updatedAt: Date | undefined;
}
