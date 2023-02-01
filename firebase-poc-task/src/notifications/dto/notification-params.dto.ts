import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NotificationParamsDto {
  @ApiProperty()
  @IsString()
  topic: string;

  @ApiProperty()
  @IsString()
  deviceToken: string;
}
