import { createBotParamDecorator } from '../../utils/param-decorator.util';
import { BotParamtype } from '../../enums/bot-paramtype.enum';

export const Context: () => ParameterDecorator = createBotParamDecorator(
  BotParamtype.CONTEXT,
);

export const Ctx = Context;
