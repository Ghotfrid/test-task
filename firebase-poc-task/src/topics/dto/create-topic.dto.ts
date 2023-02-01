import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;
}
