import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { FirebaseService } from 'src/firebase/firebase.service';

@Processor('message-queue')
export class MessageConsumer {
  constructor(private firebaseService: FirebaseService) {}

  @OnQueueFailed()
  handler(job: Job, error: Error) {
    console.error('Fired exception', job, error);
  }

  @Process('message-job')
  async readOperationJob(job: Job<unknown>) {
    const { data: topic } = job;

    return await this.firebaseService.sendMessage(<string>topic, {
      data: { title: `${topic} | Welcome`, body: 'Welcome message' },
    });
  }
}
