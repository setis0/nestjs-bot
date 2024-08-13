import { Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { BOT_ALL } from './bot.constants';

export const allBotsMap = new Map<string, Telegraf<any>>();

export const telegrafAllBotsProvider: Provider = {
  provide: BOT_ALL,
  useValue: allBotsMap,
};
