import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteTopicParamsDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
