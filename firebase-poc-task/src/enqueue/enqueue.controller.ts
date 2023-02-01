import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { WelcomeMessageParamsDto } from './dto/welcome-message.dto';
import { EnqueueService } from './enqueue.service';

@Controller('enqueue')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('X-API-KEY')
@ApiTags('enqueue')
export class EnqueueController {
  constructor(private enqueueService: EnqueueService) {}

  @Post('welcome-message/:topic')
  async sendWelcomeMessage(@Param() params: WelcomeMessageParamsDto) {
    this.enqueueService.sendWelcomeMessage(params.topic);
  }
}
