import { ContextType, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { BotArgumentsHost } from './bot-arguments-host.interface';

export type BotContextType = 'bot' | ContextType;

export class BotExecutionContext
  extends ExecutionContextHost
  implements BotArgumentsHost
{
  static create(context: ExecutionContext): BotExecutionContext {
    const type = context.getType();
    const botContext = new BotExecutionContext(
      context.getArgs(),
      context.getClass(),
      context.getHandler(),
    );
    botContext.setType(type);
    return botContext;
  }

  getType<TContext extends string = BotContextType>(): TContext {
    return super.getType();
  }

  getContext<T = any>(): T {
    return this.getArgByIndex(0);
  }

  getNext<T = any>(): T {
    return this.getArgByIndex(1);
  }
}
