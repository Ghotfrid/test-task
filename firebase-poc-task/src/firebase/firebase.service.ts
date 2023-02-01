import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { getApp } from 'firebase-admin/app';
import { BaseMessage } from 'firebase-admin/lib/messaging/messaging-api';

import firebaseConfig from 'src/config/firebase.config';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private config: ConfigType<typeof firebaseConfig>,
  ) {
    try {
      getApp();
    } catch {
      firebase.initializeApp(config);
    }
  }

  async subscribe(token: string, topic: string) {
    return await firebase.messaging().subscribeToTopic(token, topic);
  }

  async unsubscribe(token: string, topic: string) {
    return await firebase.messaging().unsubscribeFromTopic(token, topic);
  }

  async sendMessage(topic: string, baseMessageData: BaseMessage) {
    const message = {
      topic: topic,
      ...baseMessageData,
    };

    return await firebase.messaging().send(message);
  }
}
