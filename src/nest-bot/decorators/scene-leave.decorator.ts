import { createListenerDecorator } from '../../nest-bot/utils';
import { Scenes } from 'telegraf';

export const SceneLeave =
  createListenerDecorator<Scenes.BaseScene<never>>('leave');
