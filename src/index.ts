import { Auto, IPlugin } from '@auto-it/core';
import fetch from 'node-fetch';

interface ITypetalkPluginOptions {
  mentions?: string[];
}

export default class TypetalkPlugin implements IPlugin {
  name = 'Typetalk';

  readonly options: ITypetalkPluginOptions;

  constructor(options: ITypetalkPluginOptions) {
      if (!process.env.TYPETALK_TOKEN || !process.env.TYPETALK_TOPIC_ID) {
        throw new Error(
          'Need all of the following secrets available on the environment: TYPETALK_TOKEN, TYPETALK_TOPIC_ID'
        )
      }

      this.options = {
        mentions: options.mentions? options.mentions : []
      }
  }

  apply(auto: Auto) {
    auto.hooks.afterRelease.tapPromise(
      this.name,
      async ({ newVersion, commits, releaseNotes }) => {
        if (!newVersion) {
          return;
        }

        if ('dryRun' in auto.options && auto.options.dryRun) {
          return;
        }

        const head = commits[0];

        if (!head) {
          return;
        }

        const isSkipped = head.labels.find(label =>
          auto.release!.options.skipReleaseLabels.includes(label)  
        );

        if (isSkipped) {
          return;
        }
      }
    )    
  }

  async postToTypetalk(auto: Auto, newVersion: string, releaseNotes: string) {
    if (!auto.git) {
      return;
    }

    auto.logger.verbose.info('Posting release notest to Typetalk');

    const topicID = process.env.TYPETALK_TOPIC_ID;
    const optToken = process.env.TYPETALK_TOKEN;
    if (!optToken) {
      auto.logger.verbose.warn('Typetalk may need a token to send a message');
    }
    const token = optToken as string;

    const url = `https://typetalk.com/${topicID}`;
    const mentions = this.options.mentions? `@${this.options.mentions.join(" @")}\n`: '';
    const message =  `${mentions}New release ${newVersion}`
    const options = {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'X-Typetalk-Token': token, 'Content-Type': 'application/json' }
    }
    await fetch(url, options);
  }
}