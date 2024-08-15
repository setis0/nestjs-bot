import { SetMetadata } from '@nestjs/common';
import { COMPOSER_METADATA } from '../../bot.constants';

/**
 * `@Composer` like Update decorator, executed before decorators handlers.
 */
export const Composer = (): ClassDecorator =>
  SetMetadata(COMPOSER_METADATA, true);
