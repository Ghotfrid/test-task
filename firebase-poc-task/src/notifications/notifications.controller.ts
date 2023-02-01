import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NotificationParamsDto } from './dto/notification-params.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('/:deviceToken/subscribe/:topic')
  async subscribeToTopic(@Param() params: NotificationParamsDto) {
    return await this.notificationsService.subscribe(
      params.deviceToken,
      params.topic,
    );
  }

  @Delete('/:deviceToken/unsubscribe/:topic')
  async unsubscribeToTopic(@Param() params: NotificationParamsDto) {
    return await this.notificationsService.unsubscribe(
      params.deviceToken,
      params.topic,
    );
  }
}
