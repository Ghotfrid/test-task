import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { CreateTopicDto } from './dto/create-topic.dto';
import { DeleteTopicParamsDto } from './dto/delete-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
@ApiTags('topics')
@UseGuards(AuthGuard('api-key'))
@ApiSecurity('X-API-KEY')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getTopics() {
    return await this.topicsService.getAll();
  }

  @Post()
  async createTopic(@Body() createTopicDto: CreateTopicDto) {
    return await this.topicsService.create(createTopicDto);
  }

  @Delete(':id')
  async deleteTopic(@Param() params: DeleteTopicParamsDto) {
    return await this.topicsService.delete(params.id);
  }
}
