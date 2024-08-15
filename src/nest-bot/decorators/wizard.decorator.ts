import { SetMetadata } from '@nestjs/common';
import { SceneOptions } from 'telegraf/typings/scenes/base';
import { SceneMetadata } from '../../nest-bot/interfaces';
import { SCENE_METADATA } from '../../nest-bot/bot.constants';

export const Wizard = (
  sceneId: string,
  options?: SceneOptions<any>,
): ClassDecorator =>
  SetMetadata<string, SceneMetadata>(SCENE_METADATA, {
    sceneId,
    type: 'wizard',
    options,
  });
