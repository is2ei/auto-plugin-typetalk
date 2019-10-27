import { Auto, IPlugin } from '@auto-it/core';

interface ITypetalkPluginOptions {
  mentions: string[];
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
}