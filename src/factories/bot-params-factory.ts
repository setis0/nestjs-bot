import { ParamData } from '@nestjs/common';
import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { Context } from 'telegraf';
import { BotParamtype } from '../enums/bot-paramtype.enum';

export class TelegrafParamsFactory implements ParamsFactory {
  exchangeKeyForValue(
    type: BotParamtype,
    data: ParamData,
    args: unknown[],
  ): unknown {
    const ctx = args[0] as Context;
    const next = args[1] as Function;

    switch (type) {
      case BotParamtype.CONTEXT:
        return ctx;
      case BotParamtype.NEXT:
        return next;
      case BotParamtype.SENDER:
        return data && ctx.from ? ctx.from[data as string] : ctx.from;
      case BotParamtype.MESSAGE:
        return data && ctx.message ? ctx.message[data as string] : ctx.message;
      default:
        return null;
    }
  }
}
