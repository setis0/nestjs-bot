import { ParamData } from '@nestjs/common';
import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { Context } from 'telegraf';
import { BotParamtype } from '../interfaces/bot-paramtype.enum';

export class BotParamsFactory implements ParamsFactory {
  exchangeKeyForValue(
    type: BotParamtype,
    data: ParamData,
    args: [Context,Function,string,string],
  ): unknown {
    switch (type) {
      case BotParamtype.CONTEXT:
        return args[0] as Context;
      case BotParamtype.NEXT:
        return args[1] as Function;
      case BotParamtype.SENDER:
        return args[2] as string;
      case BotParamtype.MESSAGE:
        return args[3] as string;
      default:
        return null;
    }
  }
}
