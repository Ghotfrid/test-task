import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { TopicsModule } from './topics/topics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { configValidationSchema } from './config.schema';
import { PrismaService } from './prisma/prisma.service';
import { FirebaseModule } from './firebase/firebase.module';
import { EnqueueModule } from './enqueue/enqueue.module';
import { DevicesService } from './devices/devices.service';
import { DevicesModule } from './devices/devices.module';
import firebaseConfig from './config/firebase.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidationSchema,
      load: [firebaseConfig],
    }),
    TopicsModule,
    NotificationsModule,
    FirebaseModule,
    DevicesModule,
    EnqueueModule,
    AuthModule,
  ],
  providers: [PrismaService, DevicesService],
})
export class AppModule {}
