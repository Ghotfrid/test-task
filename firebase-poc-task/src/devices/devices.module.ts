import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DevicesService } from './devices.service';

@Module({
  providers: [DevicesService, PrismaService],
})
export class DevicesModule {}
