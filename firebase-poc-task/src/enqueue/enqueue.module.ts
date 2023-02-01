import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FirebaseService } from 'src/firebase/firebase.service';

import { EnqueueController } from './enqueue.controller';
import { EnqueueService } from './enqueue.service';
import { MessageConsumer } from './message.consumer';
import { MessageProducerService } from './message.producer.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number.parseInt(configService.get('REDIS_PORT'), 10),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [EnqueueController],
  providers: [
    EnqueueService,
    FirebaseService,
    MessageProducerService,
    MessageConsumer,
  ],
})
export class EnqueueModule {}
