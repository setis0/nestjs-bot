import { Provider } from '@nestjs/common';
import { BOT_STAGE } from './bot.constants';

export const BotStageProvider: Provider = {
  provide: BOT_STAGE,
  useClass: Scenes.Stage,
};
