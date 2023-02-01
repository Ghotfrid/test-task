import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async create(token: string) {
    return await this.prisma.device.create({ data: { token } });
  }

  async findBy(where: Prisma.DeviceWhereInput) {
    return await this.prisma.device.findFirst({ where });
  }
}
