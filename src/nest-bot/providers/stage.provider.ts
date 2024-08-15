import { Provider } from '@nestjs/common';
import { BOT_STAGE } from '../interfaces/bot.constants';

export const BotStageProvider: Provider = {
  provide: BOT_STAGE,
  useClass: Scenes.Stage,
};
