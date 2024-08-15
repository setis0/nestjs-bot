import { createBotParamDecorator } from '../utils/param-decorator.util';
import { BotParamtype } from '../interfaces/bot-paramtype.enum';

export const Context: () => ParameterDecorator = createBotParamDecorator(
  BotParamtype.CONTEXT,
);

