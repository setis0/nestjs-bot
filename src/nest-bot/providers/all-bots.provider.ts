import { Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { BOT_ALL } from '../interfaces/bot.constants';
import { BotApiContext, BotApiManager } from "../interfaces";

export const allBotsMap = new Map<string, BotApiManager>();

export const allBotsProvider: Provider = {
  provide: BOT_ALL,
  useValue: allBotsMap,
};
