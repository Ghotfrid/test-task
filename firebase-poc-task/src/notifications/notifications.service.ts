import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(
    private firebaseService: FirebaseService,
    private prisma: PrismaService,
  ) {}

  async subscribe(deviceToken: string, topicName: string) {
    try {
      await this.prisma.topic.update({
        where: { name: topicName },
        include: { Subscribers: true },
        data: {
          Subscribers: {
            connectOrCreate: {
              where: { token: deviceToken },
              create: { token: deviceToken },
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2016') {
        throw new UnprocessableEntityException(
          "Topic with this name doesn't exist!",
        );
      }
      throw new InternalServerErrorException(error);
    }

    const subscribeResponse = await this.firebaseService.subscribe(
      deviceToken,
      topicName,
    );

    if (subscribeResponse.failureCount > 0) {
      throw new InternalServerErrorException(subscribeResponse);
    }

    return subscribeResponse;
  }

  async unsubscribe(deviceToken: string, topicName: string) {
    try {
      await this.prisma.topic.update({
        where: { name: topicName },
        include: { Subscribers: true },
        data: {
          Subscribers: {
            delete: {
              token: deviceToken,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2016') {
        throw new UnprocessableEntityException(
          "Topic with this name doesn't exist!",
        );
      }
      throw new InternalServerErrorException(error);
    }

    const unsubscribeResponse = await this.firebaseService.unsubscribe(
      deviceToken,
      topicName,
    );

    if (unsubscribeResponse.failureCount > 0) {
      throw new InternalServerErrorException(unsubscribeResponse);
    }

    return unsubscribeResponse;
  }
}
