import { ArgumentsHost } from '@nestjs/common';

export interface BotArgumentsHost extends ArgumentsHost {
  getContext<T = any>(): T;
  getNext<T = any>(): T;
}
