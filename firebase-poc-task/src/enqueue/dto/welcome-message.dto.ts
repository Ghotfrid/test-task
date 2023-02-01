import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WelcomeMessageParamsDto {
  @ApiProperty()
  @IsString()
  topic: string;
}
