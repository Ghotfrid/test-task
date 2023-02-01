import { Module } from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, FirebaseService, PrismaService],
})
export class NotificationsModule {}
