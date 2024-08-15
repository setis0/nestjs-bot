import { BOT_NAME_DEFAULT } from '../interfaces/bot.constants';

export function getBotToken(name?: string): string {
  return name && name !== BOT_NAME_DEFAULT ? `${name}Bot` : BOT_NAME_DEFAULT;
}
