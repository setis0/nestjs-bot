import { createBotParamDecorator } from '../utils/param-decorator.util';
import { BotParamtype } from '../interfaces/bot-paramtype.enum';

export const Next: () => ParameterDecorator = createBotParamDecorator(
  BotParamtype.NEXT,
);
