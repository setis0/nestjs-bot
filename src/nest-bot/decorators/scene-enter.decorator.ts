import { createListenerDecorator } from '../../nest-bot/utils';
import { Scenes } from 'telegraf';

export const SceneEnter =
  createListenerDecorator<Scenes.BaseScene<never>>('enter');
