import { createBotParamDecorator } from '../../utils/param-decorator.util';
import { BotParamtype } from '../../enums/bot-paramtype.enum';

export const Next: () => ParameterDecorator = createBotParamDecorator(
  BotParamtype.NEXT,
);
