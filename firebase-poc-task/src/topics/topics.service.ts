import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.topic.findMany();
  }

  async create(createTopicDto: CreateTopicDto) {
    return await this.prisma.topic.create({ data: createTopicDto });
  }

  async delete(id: string) {
    return await this.prisma.topic.delete({
      where: { id },
    });
  }
}
