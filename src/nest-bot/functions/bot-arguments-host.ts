import { ArgumentsHost } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { BotArgumentsHost } from './bot-arguments-host.interface';

export class BotArgumentsHost
  extends ExecutionContextHost
  implements BotArgumentsHost
{
  static create(context: ArgumentsHost): BotArgumentsHost {
    const type = context.getType();
    const tgContext = new BotArgumentsHost(context.getArgs());
    tgContext.setType(type);
    return tgContext;
  }

  getContext<T = any>(): T {
    return this.getArgByIndex(0);
  }

  getNext<T = any>(): T {
    return this.getArgByIndex(1);
  }
}
