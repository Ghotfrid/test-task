import { Injectable } from '@nestjs/common';

import { MessageProducerService } from './message.producer.service';

@Injectable()
export class EnqueueService {
  constructor(
    private readonly messageProducerService: MessageProducerService,
  ) {}

  async sendWelcomeMessage(topic: string) {
    this.messageProducerService.sendMessage(topic);
  }
}
